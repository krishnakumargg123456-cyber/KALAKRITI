from __future__ import annotations

from decimal import Decimal
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.payments.razorpay import razorpay_client
from app.models.order import Order
from app.models.payment import Payment


def amount_to_paise(amount: Decimal) -> int:
    return int(
        (amount * Decimal("100")).quantize(Decimal("1"))
    )


def paise_to_amount(amount: int) -> Decimal:
    return (
        Decimal(amount) / Decimal("100")
    ).quantize(Decimal("0.01"))


async def create_razorpay_order(
    db: AsyncSession,
    *,
    order: Order,
    payment: Payment,
) -> dict[str, Any]:

    if payment.amount != order.total_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment amount does not match order total",
        )

    amount = amount_to_paise(payment.amount)

    try:
        razorpay_order = razorpay_client.order.create(
            {
                "amount": amount,
                "currency": "INR",
                "receipt": order.order_number,
                "notes": {
                    "order_id": str(order.id),
                    "payment_id": str(payment.id),
                },
            }
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to create Razorpay order",
        ) from exc

    payment.gateway = "razorpay"
    payment.gateway_order_id = razorpay_order["id"]

    await db.flush()

    return razorpay_order
