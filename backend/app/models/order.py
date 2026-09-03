from __future__ import annotations

from decimal import Decimal
import uuid
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.product import Product


class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    RETURNED = "returned"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class Order(Base, TimestampMixin):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)

    order_number: Mapped[str] = mapped_column(
        String(40),
        unique=True,
        nullable=False,
        index=True,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    status: Mapped[OrderStatus] = mapped_column(
        default=OrderStatus.PENDING,
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    shipping_fee: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0,
    )

    discount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0,
    )

    tax: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0,
    )

    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    shipping_full_name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    shipping_phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    shipping_address_line1: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    shipping_address_line2: Mapped[str | None] = mapped_column(
        String(255)
    )

    shipping_city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    shipping_state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    shipping_postal_code: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
    )

    shipping_country: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="India",
    )

    notes: Mapped[str | None] = mapped_column(Text)

    user: Mapped["User"] = relationship()

    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    product_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    order: Mapped["Order"] = relationship(
        back_populates="items"
    )

    product: Mapped["Product"] = relationship()
