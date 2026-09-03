from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

import uuid

from sqlalchemy import CheckConstraint, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


if TYPE_CHECKING:
    from app.models.product import Product
    from app.models.user import User


class ReviewStatus(str, Enum):
    PENDING = "pending"
    PUBLISHED = "published"
    FLAGGED = "flagged"
    REJECTED = "rejected"


class Review(Base, TimestampMixin):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    title: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[ReviewStatus] = mapped_column(
        String(20),
        nullable=False,
        default=ReviewStatus.PENDING,
        index=True,
    )

    product: Mapped["Product"] = relationship()

    user: Mapped["User"] = relationship()

    __table_args__ = (
        CheckConstraint(
            "rating >= 1 AND rating <= 5",
            name="ck_review_rating_range",
        ),
        UniqueConstraint(
            "product_id",
            "user_id",
            name="uq_review_product_user",
        ),
    )
