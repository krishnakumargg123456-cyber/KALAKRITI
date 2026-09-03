from __future__ import annotations

import razorpay

from app.config import settings


def get_razorpay_client() -> razorpay.Client:
    if not settings.RAZORPAY_KEY_ID:
        raise RuntimeError("RAZORPAY_KEY_ID is not configured")

    if not settings.RAZORPAY_KEY_SECRET:
        raise RuntimeError("RAZORPAY_KEY_SECRET is not configured")

    return razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET,
        )
    )
