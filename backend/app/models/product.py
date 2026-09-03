import uuid
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.artisan import Artisan
    from app.models.category import Category
    from app.models.inventory import Inventory
    from app.models.product_image import ProductImage


class Product(TimestampMixin, Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    artisan_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("artisans.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    category_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(220),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    compare_at_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    sku: Mapped[str] = mapped_column(
        String(80),
        unique=True,
        nullable=False,
        index=True,
    )

    material: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    dimensions: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    craft_region: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="Draft",
        index=True,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )

    artisan: Mapped["Artisan"] = relationship(
        "Artisan",
        lazy="selectin",
    )

    category: Mapped["Category"] = relationship(
        "Category",
        lazy="selectin",
    )

    inventory: Mapped["Inventory | None"] = relationship(
        "Inventory",
        uselist=False,
        lazy="selectin",
        cascade="all, delete-orphan",
    )

    images: Mapped[list["ProductImage"]] = relationship(
        "ProductImage",
        back_populates="product",
        cascade="all, delete-orphan",
        order_by="ProductImage.sort_order",
    )

    @property
    def artisan_name(self) -> str | None:
        return self.artisan.shop_name if self.artisan else None

    @property
    def category_name(self) -> str | None:
        return self.category.name if self.category else None

    @property
    def stock(self) -> int:
        return self.inventory.quantity if self.inventory else 0

    @property
    def available_stock(self) -> int:
        if not self.inventory:
            return 0

        return max(
            self.inventory.quantity - self.inventory.reserved_quantity,
            0,
        )
