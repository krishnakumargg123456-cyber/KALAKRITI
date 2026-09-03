from __future__ import annotations

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.product import Product


class ProductRepository:

    def _product_options(self):
        return (
            selectinload(Product.images),
            selectinload(Product.artisan),
            selectinload(Product.category),
            selectinload(Product.inventory),
        )

    async def list(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 20,
        category_id: UUID | None = None,
        artisan_id: UUID | None = None,
        is_active: bool | None = True,
        is_featured: bool | None = None,
        status: str | None = None,
    ) -> list[Product]:

        stmt = select(Product).options(
            *self._product_options()
        )

        if category_id is not None:
            stmt = stmt.where(Product.category_id == category_id)

        if artisan_id is not None:
            stmt = stmt.where(Product.artisan_id == artisan_id)

        if is_active is not None:
            stmt = stmt.where(
                Product.is_active.is_(is_active)
            )

        if is_featured is not None:
            stmt = stmt.where(
                Product.is_featured.is_(is_featured)
            )

        if status is not None:
            stmt = stmt.where(
                Product.status == status
            )

        stmt = (
            stmt
            .order_by(Product.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(stmt)

        return list(result.scalars().all())

    async def count(
        self,
        db: AsyncSession,
        *,
        category_id: UUID | None = None,
        artisan_id: UUID | None = None,
        is_active: bool | None = True,
        is_featured: bool | None = None,
        status: str | None = None,
    ) -> int:

        stmt = select(func.count(Product.id))

        if category_id is not None:
            stmt = stmt.where(Product.category_id == category_id)

        if artisan_id is not None:
            stmt = stmt.where(Product.artisan_id == artisan_id)

        if is_active is not None:
            stmt = stmt.where(
                Product.is_active.is_(is_active)
            )

        if is_featured is not None:
            stmt = stmt.where(
                Product.is_featured.is_(is_featured)
            )

        if status is not None:
            stmt = stmt.where(
                Product.status == status
            )

        result = await db.execute(stmt)

        return result.scalar_one()

    async def get_by_id(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> Product | None:

        result = await db.execute(
            select(Product)
            .options(*self._product_options())
            .where(Product.id == product_id)
        )

        return result.scalar_one_or_none()

    async def get_by_slug(
        self,
        db: AsyncSession,
        slug: str,
    ) -> Product | None:

        result = await db.execute(
            select(Product)
            .options(*self._product_options())
            .where(Product.slug == slug)
        )

        return result.scalar_one_or_none()

    async def get_by_sku(
        self,
        db: AsyncSession,
        sku: str,
    ) -> Product | None:

        result = await db.execute(
            select(Product)
            .options(*self._product_options())
            .where(Product.sku == sku)
        )

        return result.scalar_one_or_none()

    async def list_by_artisan(
        self,
        db: AsyncSession,
        *,
        artisan_id: UUID,
        skip: int = 0,
        limit: int = 50,
        status: str | None = None,
    ) -> list[Product]:

        stmt = (
            select(Product)
            .options(*self._product_options())
            .where(Product.artisan_id == artisan_id)
        )

        if status is not None:
            stmt = stmt.where(
                Product.status == status
            )

        stmt = (
            stmt
            .order_by(Product.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(stmt)

        return list(result.scalars().all())

    async def count_by_artisan(
        self,
        db: AsyncSession,
        *,
        artisan_id: UUID,
        status: str | None = None,
    ) -> int:

        stmt = select(func.count(Product.id)).where(
            Product.artisan_id == artisan_id
        )

        if status is not None:
            stmt = stmt.where(
                Product.status == status
            )

        result = await db.execute(stmt)

        return result.scalar_one()

    async def create(
        self,
        db: AsyncSession,
        product: Product,
    ) -> Product:

        db.add(product)

        await db.flush()
        await db.refresh(product)

        return product

    async def update(
        self,
        db: AsyncSession,
        product: Product,
    ) -> Product:

        await db.flush()
        await db.refresh(product)

        return product

    async def delete(
        self,
        db: AsyncSession,
        product: Product,
    ) -> None:

        await db.delete(product)

        await db.flush()
