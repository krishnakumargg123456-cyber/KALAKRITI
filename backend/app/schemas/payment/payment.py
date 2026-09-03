from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.models.payment import PaymentMethod, PaymentTransactionStatus


class PaymentCreate(BaseModel):
    order_id: int = Field(gt=0)
    amount: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    method: PaymentMethod
    gateway: str | None = Field(default=None, max_length=50)


class RazorpayOrderCreate(BaseModel):
    order_id: int = Field(gt=0)


class RazorpayVerifyRequest(BaseModel):
    payment_id: int = Field(gt=0)
    razorpay_order_id: str = Field(min_length=1, max_length=255)
    razorpay_payment_id: str = Field(min_length=1, max_length=255)
    razorpay_signature: str = Field(min_length=1, max_length=255)


class PaymentStatusUpdate(BaseModel):
    status: PaymentTransactionStatus
    transaction_id: str | None = Field(default=None, max_length=255)
    gateway_order_id: str | None = Field(default=None, max_length=255)
    gateway_payment_id: str | None = Field(default=None, max_length=255)
    failure_reason: str | None = None


class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_id: int
    amount: Decimal
    method: PaymentMethod
    status: PaymentTransactionStatus
    gateway: str | None
    transaction_id: str | None
    gateway_order_id: str | None
    gateway_payment_id: str | None
    failure_reason: str | None
    created_at: datetime
    updated_at: datetime


class RazorpayOrderResponse(BaseModel):
    payment: PaymentResponse
    razorpay_order_id: str
    razorpay_key_id: str
    amount: int
    currency: str


class RazorpayVerifyResponse(BaseModel):
    payment: PaymentResponse
    verified: bool


class PaymentGatewayResponse(BaseModel):
    payment: PaymentResponse
    gateway_data: dict[str, Any] | None = None
