from __future__ import annotations

from decimal import Decimal
from typing import Any

from app.core.payments.razorpay import get_razorpay_client


def create_razorpay_order(
    amount: Decimal,
    receipt: str,
    currency: str = "INR",
) -> dict[str, Any]:
    client = get_razorpay_client()

    amount_paise = int(
        (amount * Decimal("100")).quantize(Decimal("1"))
    )

    if amount_paise <= 0:
        raise ValueError("Razorpay order amount must be greater than zero")

    return client.order.create(
        {
            "amount": amount_paise,
            "currency": currency,
            "receipt": receipt,
            "payment_capture": 1,
        }
    )


def verify_razorpay_signature(
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
) -> None:
    client = get_razorpay_client()

    client.utility.verify_payment_signature(
        {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature,
        }
    )


def verify_razorpay_webhook_signature(
    payload: bytes,
    signature: str,
) -> None:
    from app.config import settings

    if not settings.RAZORPAY_WEBHOOK_SECRET:
        raise RuntimeError(
            "RAZORPAY_WEBHOOK_SECRET is not configured"
        )

    client = get_razorpay_client()

    client.utility.verify_webhook_signature(
        payload.decode("utf-8"),
        signature,
        settings.RAZORPAY_WEBHOOK_SECRET,
    )
