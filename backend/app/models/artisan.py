import uuid

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


class Artisan(TimestampMixin, Base):
    __tablename__ = "artisans"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    shop_name: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
    )

    bio: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    craft_specialization: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    state: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    district: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )
