from __future__ import annotations

import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User
from app.models.wishlist import Wishlist, WishlistItem


async def get_or_create_wishlist(
    db: AsyncSession,
    user: User,
) -> Wishlist:
    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.user_id == user.id)
        .options(selectinload(Wishlist.items))
    )

    wishlist = result.scalar_one_or_none()

    if wishlist:
        return wishlist

    wishlist = Wishlist(user_id=user.id)

    db.add(wishlist)
    await db.commit()

    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.id == wishlist.id)
        .options(selectinload(Wishlist.items))
    )

    return result.scalar_one()


async def get_wishlist(
    db: AsyncSession,
    user: User,
) -> Wishlist:
    return await get_or_create_wishlist(db, user)


async def add_item(
    db: AsyncSession,
    user: User,
    product_id: uuid.UUID,
) -> Wishlist:
    product_result = await db.execute(
        select(Product).where(
            Product.id == product_id,
            Product.is_active.is_(True),
        )
    )

    product = product_result.scalar_one_or_none()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or inactive",
        )

    wishlist = await get_wishlist(db, user)

    item_result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == product_id,
        )
    )

    existing_item = item_result.scalar_one_or_none()

    if existing_item:
        return wishlist

    item = WishlistItem(
        wishlist_id=wishlist.id,
        product_id=product.id,
    )

    db.add(item)
    await db.commit()

    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.id == wishlist.id)
        .options(selectinload(Wishlist.items))
    )

    return result.scalar_one()


async def remove_item(
    db: AsyncSession,
    user: User,
    product_id: uuid.UUID,
) -> Wishlist:
    wishlist = await get_wishlist(db, user)

    result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == product_id,
        )
    )

    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product is not in wishlist",
        )

    await db.delete(item)
    await db.commit()

    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.id == wishlist.id)
        .options(selectinload(Wishlist.items))
    )

    return result.scalar_one()


async def clear_wishlist(
    db: AsyncSession,
    user: User,
) -> Wishlist:
    wishlist = await get_wishlist(db, user)

    for item in wishlist.items:
        await db.delete(item)

    await db.commit()

    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.id == wishlist.id)
        .options(selectinload(Wishlist.items))
    )

    return result.scalar_one()


async def move_item_to_cart(
    db: AsyncSession,
    user: User,
    product_id: uuid.UUID,
) -> Wishlist:
    product_result = await db.execute(
        select(Product).where(
            Product.id == product_id,
            Product.is_active.is_(True),
        )
    )

    product = product_result.scalar_one_or_none()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or inactive",
        )

    wishlist = await get_wishlist(db, user)

    wishlist_item_result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == product_id,
        )
    )

    wishlist_item = wishlist_item_result.scalar_one_or_none()

    if not wishlist_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product is not in wishlist",
        )

    cart_result = await db.execute(
        select(Cart)
        .where(Cart.user_id == user.id)
        .options(selectinload(Cart.items))
    )

    cart = cart_result.scalar_one_or_none()

    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)
        await db.flush()

    cart_item_result = await db.execute(
        select(CartItem).where(
            CartItem.cart_id == cart.id,
            CartItem.product_id == product_id,
        )
    )

    cart_item = cart_item_result.scalar_one_or_none()

    if cart_item:
        cart_item.quantity += 1
        cart_item.unit_price = product.price
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=product.id,
            quantity=1,
            unit_price=product.price,
        )
        db.add(cart_item)

    await db.delete(wishlist_item)
    await db.commit()

    result = await db.execute(
        select(Wishlist)
        .where(Wishlist.id == wishlist.id)
        .options(selectinload(Wishlist.items))
    )

    return result.scalar_one()
