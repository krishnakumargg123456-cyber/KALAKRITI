from __future__ import annotations

from decimal import Decimal
from enum import Enum
import uuid

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


class PayoutStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Payout(Base, TimestampMixin):
    __tablename__ = "payouts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    artisan_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("artisans.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    gross_amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    commission_amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0,
    )

    net_amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    status: Mapped[PayoutStatus] = mapped_column(
        default=PayoutStatus.PENDING,
        nullable=False,
        index=True,
    )

    payout_reference: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    failure_reason: Mapped[str | None] = mapped_column(
        Text,
    )

    payment_gateway: Mapped[str | None] = mapped_column(
        String(50),
    )

    transaction_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    artisan = relationship("Artisan")
    order = relationship("Order")
