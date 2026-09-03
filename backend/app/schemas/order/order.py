from __future__ import annotations

from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.order import OrderStatus, PaymentStatus


class OrderCreate(BaseModel):
    shipping_full_name: str = Field(min_length=2, max_length=120)
    shipping_phone: str = Field(min_length=5, max_length=20)
    shipping_address_line1: str = Field(min_length=1, max_length=255)
    shipping_address_line2: str | None = Field(
        default=None,
        max_length=255,
    )
    shipping_city: str = Field(min_length=1, max_length=100)
    shipping_state: str = Field(min_length=1, max_length=100)
    shipping_postal_code: str = Field(min_length=3, max_length=10)
    shipping_country: str = Field(
        default="India",
        max_length=100,
    )
    notes: str | None = None


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: UUID
    product_name: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_number: str
    user_id: UUID
    status: OrderStatus
    payment_status: PaymentStatus

    subtotal: Decimal
    shipping_fee: Decimal
    discount: Decimal
    tax: Decimal
    total_amount: Decimal

    shipping_full_name: str
    shipping_phone: str
    shipping_address_line1: str
    shipping_address_line2: str | None
    shipping_city: str
    shipping_state: str
    shipping_postal_code: str
    shipping_country: str

    notes: str | None
    items: list[OrderItemResponse]
