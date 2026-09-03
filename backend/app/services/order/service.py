from __future__ import annotations

import uuid
from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem, OrderStatus, PaymentStatus
from app.models.product import Product
from app.models.user import User


SHIPPING_FEE = Decimal("0.00")
DISCOUNT = Decimal("0.00")
TAX = Decimal("0.00")


async def get_orders(
    db: AsyncSession,
    user: User,
) -> list[Order]:
    result = await db.execute(
        select(Order)
        .where(Order.user_id == user.id)
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc())
    )

    return list(result.scalars().unique().all())


async def get_order(
    db: AsyncSession,
    user: User,
    order_id: int,
) -> Order:
    result = await db.execute(
        select(Order)
        .where(
            Order.id == order_id,
            Order.user_id == user.id,
        )
        .options(selectinload(Order.items))
    )

    order = result.scalar_one_or_none()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    return order


async def create_order(
    db: AsyncSession,
    user: User,
    shipping_full_name: str,
    shipping_phone: str,
    shipping_address_line1: str,
    shipping_address_line2: str | None,
    shipping_city: str,
    shipping_state: str,
    shipping_postal_code: str,
    shipping_country: str = "India",
    notes: str | None = None,
) -> Order:

    # ---------------------------------------------------------
    # 1. Get user's cart with items
    # ---------------------------------------------------------

    cart_result = await db.execute(
        select(Cart)
        .where(Cart.user_id == user.id)
        .options(selectinload(Cart.items))
    )

    cart = cart_result.scalar_one_or_none()

    if not cart or not cart.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty",
        )

    # ---------------------------------------------------------
    # 2. Load all products and validate them
    # ---------------------------------------------------------

    product_ids = [
        item.product_id
        for item in cart.items
    ]

    products_result = await db.execute(
        select(Product).where(
            Product.id.in_(product_ids),
            Product.is_active.is_(True),
        )
    )

    products = {
        product.id: product
        for product in products_result.scalars().all()
    }

    if len(products) != len(set(product_ids)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more cart products are unavailable",
        )

    # ---------------------------------------------------------
    # 3. Calculate subtotal server-side
    # ---------------------------------------------------------

    subtotal = Decimal("0.00")

    order_items_data = []

    for cart_item in cart.items:
        product = products.get(cart_item.product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cart contains an unavailable product",
            )

        if cart_item.quantity < 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid cart quantity",
            )

        unit_price = product.price
        total_price = unit_price * cart_item.quantity

        subtotal += total_price

        order_items_data.append(
            {
                "product_id": product.id,
                "product_name": product.name,
                "quantity": cart_item.quantity,
                "unit_price": unit_price,
                "total_price": total_price,
            }
        )

    # ---------------------------------------------------------
    # 4. Calculate final amount
    # ---------------------------------------------------------

    shipping_fee = SHIPPING_FEE
    discount = DISCOUNT
    tax = TAX

    total_amount = (
        subtotal
        + shipping_fee
        - discount
        + tax
    )

    # ---------------------------------------------------------
    # 5. Generate unique order number
    # ---------------------------------------------------------

    order_number = f"KK-{uuid.uuid4().hex[:12].upper()}"

    # ---------------------------------------------------------
    # 6. Create order
    # ---------------------------------------------------------

    order = Order(
        order_number=order_number,
        user_id=user.id,
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.PENDING,
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        discount=discount,
        tax=tax,
        total_amount=total_amount,
        shipping_full_name=shipping_full_name,
        shipping_phone=shipping_phone,
        shipping_address_line1=shipping_address_line1,
        shipping_address_line2=shipping_address_line2,
        shipping_city=shipping_city,
        shipping_state=shipping_state,
        shipping_postal_code=shipping_postal_code,
        shipping_country=shipping_country,
        notes=notes,
    )

    db.add(order)

    # ---------------------------------------------------------
    # 7. Create order items
    # ---------------------------------------------------------

    for item_data in order_items_data:
        order.items.append(
            OrderItem(
                product_id=item_data["product_id"],
                product_name=item_data["product_name"],
                quantity=item_data["quantity"],
                unit_price=item_data["unit_price"],
                total_price=item_data["total_price"],
            )
        )

    # ---------------------------------------------------------
    # 8. Clear cart
    # ---------------------------------------------------------

    for cart_item in cart.items:
        await db.delete(cart_item)

    # ---------------------------------------------------------
    # 9. Commit everything atomically
    # ---------------------------------------------------------

    try:
        await db.commit()

    except Exception:
        await db.rollback()
        raise

    # ---------------------------------------------------------
    # 10. Reload order with items
    # ---------------------------------------------------------

    result = await db.execute(
        select(Order)
        .where(Order.id == order.id)
        .options(selectinload(Order.items))
    )

    return result.scalar_one()

async def create_order_from_cart(
    db: AsyncSession,
    user: User,
    shipping_full_name: str,
    shipping_phone: str,
    shipping_address_line1: str,
    shipping_address_line2: str | None,
    shipping_city: str,
    shipping_state: str,
    shipping_postal_code: str,
    shipping_country: str = "India",
    notes: str | None = None,
) -> Order:
    return await create_order(
        db=db,
        user=user,
        shipping_full_name=shipping_full_name,
        shipping_phone=shipping_phone,
        shipping_address_line1=shipping_address_line1,
        shipping_address_line2=shipping_address_line2,
        shipping_city=shipping_city,
        shipping_state=shipping_state,
        shipping_postal_code=shipping_postal_code,
        shipping_country=shipping_country,
        notes=notes,
    )

async def get_my_orders(
    db: AsyncSession,
    user: User,
) -> list[Order]:
    return await get_orders(
        db=db,
        user=user,
    )
