from __future__ import annotations

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database.base import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User


class ModerationItem(TimestampMixin, Base):
    __tablename__ = "moderation_items"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    content_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        index=True,
    )

    content_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    submitted_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    image_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="Pending",
        index=True,
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="Normal",
        index=True,
    )

    reviewed_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
        index=True,
    )

    reviewed_at: Mapped[datetime | None] = mapped_column(
        nullable=True,
    )

    rejection_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
