from __future__ import annotations

from decimal import Decimal
from enum import Enum

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


class PaymentMethod(str, Enum):
    COD = "cod"
    UPI = "upi"
    CARD = "card"
    NET_BANKING = "net_banking"
    WALLET = "wallet"


class PaymentTransactionStatus(str, Enum):
    CREATED = "created"
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    REFUNDED = "refunded"


class Payment(Base, TimestampMixin):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True)

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
        index=True,
    )

    amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    method: Mapped[PaymentMethod] = mapped_column(
        nullable=False,
    )

    status: Mapped[PaymentTransactionStatus] = mapped_column(
        default=PaymentTransactionStatus.CREATED,
        nullable=False,
    )

    gateway: Mapped[str | None] = mapped_column(
        String(50)
    )

    transaction_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    gateway_order_id: Mapped[str | None] = mapped_column(
        String(255),
        index=True,
    )

    gateway_payment_id: Mapped[str | None] = mapped_column(
        String(255),
        index=True,
    )

    failure_reason: Mapped[str | None] = mapped_column(
        Text
    )

    order = relationship("Order")
