from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


class CategoryRepository:

    async def get_all(
        self,
        db: AsyncSession,
        active_only: bool = True,
    ) -> list[Category]:
        stmt = select(Category).order_by(Category.name.asc())

        if active_only:
            stmt = stmt.where(Category.is_active.is_(True))

        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(
        self,
        db: AsyncSession,
        category_id: UUID,
    ) -> Category | None:
        result = await db.execute(
            select(Category).where(Category.id == category_id)
        )
        return result.scalar_one_or_none()

    async def get_by_slug(
        self,
        db: AsyncSession,
        slug: str,
    ) -> Category | None:
        result = await db.execute(
            select(Category).where(Category.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_by_name(
        self,
        db: AsyncSession,
        name: str,
    ) -> Category | None:
        result = await db.execute(
            select(Category).where(Category.name == name)
        )
        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        category: Category,
    ) -> Category:
        db.add(category)
        await db.flush()
        await db.refresh(category)
        return category

    async def delete(
        self,
        db: AsyncSession,
        category: Category,
    ) -> None:
        await db.delete(category)
