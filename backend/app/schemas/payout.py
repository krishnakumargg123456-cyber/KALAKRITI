from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.payout import PayoutStatus


class PayoutCreate(BaseModel):
    artisan_id: UUID
    order_id: int
    gross_amount: Decimal = Field(gt=0)
    commission_amount: Decimal = Field(default=Decimal("0"), ge=0)
    net_amount: Decimal = Field(gt=0)
    payment_gateway: str | None = Field(default=None, max_length=50)


class PayoutStatusUpdate(BaseModel):
    status: PayoutStatus
    payout_reference: str | None = Field(default=None, max_length=255)
    transaction_id: str | None = Field(default=None, max_length=255)
    failure_reason: str | None = None


class PayoutResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    artisan_id: UUID
    order_id: int
    gross_amount: Decimal
    commission_amount: Decimal
    net_amount: Decimal
    status: PayoutStatus
    payout_reference: str | None
    failure_reason: str | None
    payment_gateway: str | None
    transaction_id: str | None
    created_at: datetime
    updated_at: datetime
