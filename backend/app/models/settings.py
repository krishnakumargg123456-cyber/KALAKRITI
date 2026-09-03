from __future__ import annotations

from sqlalchemy import Boolean, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


class AdminSettings(TimestampMixin, Base):
    __tablename__ = "admin_settings"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    marketplace_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        default="KALAKRITI",
    )

    support_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    support_phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    currency: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        default="INR",
    )

    language: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="English",
    )

    timezone: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Asia/Kolkata",
    )

    order_confirmation: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    shipping_updates: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    customer_reviews: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    artisan_notifications: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    email_notifications: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    sms_notifications: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    tax_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    tax_rate: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False,
        default=5,
    )

    commission_rate: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False,
        default=15,
    )

    cod_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    razorpay_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    maintenance_mode: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    new_registrations: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    admin_approval: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )
