from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class AdminSettingsUpdate(BaseModel):
    marketplace_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )
    support_email: str | None = Field(
        default=None,
        max_length=255,
    )
    support_phone: str | None = Field(
        default=None,
        max_length=30,
    )
    currency: str | None = Field(
        default=None,
        max_length=10,
    )
    language: str | None = Field(
        default=None,
        max_length=50,
    )
    timezone: str | None = Field(
        default=None,
        max_length=100,
    )

    order_confirmation: bool | None = None
    shipping_updates: bool | None = None
    customer_reviews: bool | None = None
    artisan_notifications: bool | None = None
    email_notifications: bool | None = None
    sms_notifications: bool | None = None

    tax_enabled: bool | None = None
    tax_rate: Decimal | None = Field(
        default=None,
        ge=0,
        le=100,
    )
    commission_rate: Decimal | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    cod_enabled: bool | None = None
    razorpay_enabled: bool | None = None

    maintenance_mode: bool | None = None
    new_registrations: bool | None = None
    admin_approval: bool | None = None


class AdminSettingsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    marketplace_name: str
    support_email: str
    support_phone: str | None

    currency: str
    language: str
    timezone: str

    order_confirmation: bool
    shipping_updates: bool
    customer_reviews: bool
    artisan_notifications: bool
    email_notifications: bool
    sms_notifications: bool

    tax_enabled: bool
    tax_rate: Decimal
    commission_rate: Decimal

    cod_enabled: bool
    razorpay_enabled: bool

    maintenance_mode: bool
    new_registrations: bool
    admin_approval: bool

    created_at: datetime
    updated_at: datetime
