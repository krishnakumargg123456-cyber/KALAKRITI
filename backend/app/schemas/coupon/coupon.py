from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


DiscountType = Literal["percentage", "fixed"]


class CouponCreate(BaseModel):
    code: str = Field(
        min_length=3,
        max_length=50,
    )
    description: str | None = Field(
        default=None,
        max_length=255,
    )
    discount_type: DiscountType
    discount_value: Decimal = Field(
        gt=0,
        decimal_places=2,
    )
    minimum_order_amount: Decimal = Field(
        default=Decimal("0.00"),
        ge=0,
        decimal_places=2,
    )
    maximum_discount_amount: Decimal | None = Field(
        default=None,
        gt=0,
        decimal_places=2,
    )
    usage_limit: int | None = Field(
        default=None,
        gt=0,
    )
    starts_at: datetime | None = None
    expires_at: datetime | None = None
    is_active: bool = True

    @model_validator(mode="after")
    def validate_coupon(self):
        self.code = self.code.strip().upper()

        if self.discount_type == "percentage":
            if self.discount_value > Decimal("100"):
                raise ValueError(
                    "Percentage discount cannot exceed 100"
                )

        if self.discount_type == "fixed":
            if self.maximum_discount_amount is not None:
                raise ValueError(
                    "Maximum discount amount is only valid for percentage discounts"
                )

        if (
            self.starts_at is not None
            and self.expires_at is not None
            and self.expires_at <= self.starts_at
        ):
            raise ValueError(
                "expires_at must be later than starts_at"
            )

        return self


class CouponUpdate(BaseModel):
    description: str | None = Field(
        default=None,
        max_length=255,
    )
    discount_type: DiscountType | None = None
    discount_value: Decimal | None = Field(
        default=None,
        gt=0,
        decimal_places=2,
    )
    minimum_order_amount: Decimal | None = Field(
        default=None,
        ge=0,
        decimal_places=2,
    )
    maximum_discount_amount: Decimal | None = Field(
        default=None,
        gt=0,
        decimal_places=2,
    )
    usage_limit: int | None = Field(
        default=None,
        gt=0,
    )
    starts_at: datetime | None = None
    expires_at: datetime | None = None
    is_active: bool | None = None

    @model_validator(mode="after")
    def validate_dates(self):
        if (
            self.starts_at is not None
            and self.expires_at is not None
            and self.expires_at <= self.starts_at
        ):
            raise ValueError(
                "expires_at must be later than starts_at"
            )

        return self


class CouponResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    code: str
    description: str | None
    discount_type: DiscountType
    discount_value: Decimal
    minimum_order_amount: Decimal
    maximum_discount_amount: Decimal | None
    usage_limit: int | None
    used_count: int
    starts_at: datetime | None
    expires_at: datetime | None
    is_active: bool


class CouponApplyRequest(BaseModel):
    code: str = Field(
        min_length=3,
        max_length=50,
    )
    order_amount: Decimal = Field(
        gt=0,
        decimal_places=2,
    )


class CouponApplyResponse(BaseModel):
    code: str
    discount_amount: Decimal
    final_amount: Decimal
