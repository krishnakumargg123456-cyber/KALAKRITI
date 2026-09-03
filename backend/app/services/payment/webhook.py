from __future__ import annotations

import hmac
import hashlib

from app.config import settings


def verify_webhook_signature(
    payload: bytes,
    signature: str,
) -> bool:

    if not settings.RAZORPAY_WEBHOOK_SECRET:
        return False

    expected_signature = hmac.new(
        settings.RAZORPAY_WEBHOOK_SECRET.encode("utf-8"),
        payload,
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(
        expected_signature,
        signature,
    )
