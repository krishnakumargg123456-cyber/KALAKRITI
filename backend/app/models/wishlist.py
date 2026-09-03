from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database.base import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.product import Product
    from app.models.user import User


class Wishlist(Base, TimestampMixin):
    __tablename__ = "wishlists"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        unique=True,
    )

    user: Mapped["User"] = relationship()

    items: Mapped[list["WishlistItem"]] = relationship(
        back_populates="wishlist",
        cascade="all, delete-orphan",
    )


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id: Mapped[int] = mapped_column(primary_key=True)

    wishlist_id: Mapped[int] = mapped_column(
        ForeignKey("wishlists.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    wishlist: Mapped["Wishlist"] = relationship(
        back_populates="items"
    )

    product: Mapped["Product"] = relationship()

    __table_args__ = (
        UniqueConstraint(
            "wishlist_id",
            "product_id",
            name="uq_wishlist_product",
        ),
    )
