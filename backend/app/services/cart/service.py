from __future__ import annotations

import uuid
from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User


async def get_or_create_cart(
    db: AsyncSession,
    user: User,
) -> Cart:
    result = await db.execute(
        select(Cart)
        .where(Cart.user_id == user.id)
        .options(
            selectinload(Cart.items)
        )
    )

    cart = result.scalar_one_or_none()

    if cart:
        return cart

    cart = Cart(user_id=user.id)

    db.add(cart)
    await db.commit()

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


async def get_cart(
    db: AsyncSession,
    user: User,
) -> Cart:
    result = await db.execute(
        select(Cart)
        .where(Cart.user_id == user.id)
        .options(
            selectinload(Cart.items)
        )
    )

    cart = result.scalar_one_or_none()

    if cart:
        return cart

    cart = Cart(user_id=user.id)

    db.add(cart)
    await db.commit()

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


async def add_item(
    db: AsyncSession,
    user: User,
    product_id: uuid.UUID,
    quantity: int,
) -> Cart:

    if quantity < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be at least 1",
        )

    # ---------------------------------------------------------
    # 1. Verify product
    # ---------------------------------------------------------

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

    # ---------------------------------------------------------
    # 2. Get user's cart
    # ---------------------------------------------------------

    cart = await get_cart(db, user)

    # ---------------------------------------------------------
    # 3. Check existing cart item
    # ---------------------------------------------------------

    item_result = await db.execute(
        select(CartItem).where(
            CartItem.cart_id == cart.id,
            CartItem.product_id == product_id,
        )
    )

    item = item_result.scalar_one_or_none()

    # ---------------------------------------------------------
    # 4. Add / update item
    # ---------------------------------------------------------

    if item:
        item.quantity += quantity
        item.unit_price = product.price

    else:
        item = CartItem(
            cart_id=cart.id,
            product_id=product.id,
            quantity=quantity,
            unit_price=product.price,
        )

        db.add(item)

    # ---------------------------------------------------------
    # 5. Commit
    # ---------------------------------------------------------

    await db.commit()

    # ---------------------------------------------------------
    # 6. Explicitly reload cart + items
    # ---------------------------------------------------------

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


async def update_item(
    db: AsyncSession,
    user: User,
    item_id: int,
    quantity: int,
) -> Cart:

    if quantity < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be at least 1",
        )

    cart = await get_cart(db, user)

    result = await db.execute(
        select(CartItem).where(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id,
        )
    )

    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    item.quantity = quantity

    await db.commit()

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


async def remove_item(
    db: AsyncSession,
    user: User,
    item_id: int,
) -> Cart:

    cart = await get_cart(db, user)

    result = await db.execute(
        select(CartItem).where(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id,
        )
    )

    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    await db.delete(item)
    await db.commit()

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


async def clear_cart(
    db: AsyncSession,
    user: User,
) -> Cart:

    cart = await get_cart(db, user)

    for item in cart.items:
        await db.delete(item)

    await db.commit()

    result = await db.execute(
        select(Cart)
        .where(Cart.id == cart.id)
        .options(
            selectinload(Cart.items)
        )
    )

    return result.scalar_one()


def build_cart_response(cart: Cart) -> dict:
    subtotal = sum(
        (
            item.unit_price * item.quantity
            for item in cart.items
        ),
        Decimal("0.00"),
    )

    total_items = sum(
        item.quantity
        for item in cart.items
    )

    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items,
        "total_items": total_items,
        "subtotal": subtotal,
    }