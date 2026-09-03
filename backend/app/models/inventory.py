import uuid

from sqlalchemy import CheckConstraint, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database.base import Base
from app.models.mixins import TimestampMixin


class Inventory(TimestampMixin, Base):
    __tablename__ = "inventory"

    __table_args__ = (
        CheckConstraint(
            "quantity >= 0",
            name="ck_inventory_quantity_non_negative",
        ),
        CheckConstraint(
            "reserved_quantity >= 0",
            name="ck_inventory_reserved_non_negative",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("products.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    reserved_quantity: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    low_stock_threshold: Mapped[int] = mapped_column(
        Integer,
        default=5,
        nullable=False,
    )
