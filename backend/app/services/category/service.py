from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category
from app.repositories.category.repository import CategoryRepository
from app.schemas.category.category import CategoryCreate, CategoryUpdate


class CategoryService:

    def __init__(self) -> None:
        self.repository = CategoryRepository()

    async def list_categories(
        self,
        db: AsyncSession,
        active_only: bool = True,
    ) -> list[Category]:
        return await self.repository.get_all(
            db,
            active_only=active_only,
        )

    async def get_category(
        self,
        db: AsyncSession,
        category_id: UUID,
    ) -> Category:
        category = await self.repository.get_by_id(
            db,
            category_id,
        )

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found",
            )

        return category

    async def create_category(
        self,
        db: AsyncSession,
        data: CategoryCreate,
    ) -> Category:
        if await self.repository.get_by_name(db, data.name):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Category name already exists",
            )

        if await self.repository.get_by_slug(db, data.slug):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Category slug already exists",
            )

        if data.parent_id:
            parent = await self.repository.get_by_id(
                db,
                data.parent_id,
            )

            if not parent:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Parent category not found",
                )

        category = Category(
            name=data.name,
            slug=data.slug,
            description=data.description,
            parent_id=data.parent_id,
            is_active=data.is_active,
        )

        return await self.repository.create(db, category)

    async def update_category(
        self,
        db: AsyncSession,
        category_id: UUID,
        data: CategoryUpdate,
    ) -> Category:
        category = await self.get_category(
            db,
            category_id,
        )

        if data.name is not None and data.name != category.name:
            existing = await self.repository.get_by_name(
                db,
                data.name,
            )

            if existing and existing.id != category.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Category name already exists",
                )

            category.name = data.name

        if data.slug is not None and data.slug != category.slug:
            existing = await self.repository.get_by_slug(
                db,
                data.slug,
            )

            if existing and existing.id != category.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Category slug already exists",
                )

            category.slug = data.slug

        if data.description is not None:
            category.description = data.description

        if data.parent_id is not None:
            if data.parent_id == category.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Category cannot be its own parent",
                )

            parent = await self.repository.get_by_id(
                db,
                data.parent_id,
            )

            if not parent:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Parent category not found",
                )

            category.parent_id = data.parent_id

        if data.is_active is not None:
            category.is_active = data.is_active

        await db.flush()
        await db.refresh(category)

        return category

    async def delete_category(
        self,
        db: AsyncSession,
        category_id: UUID,
    ) -> None:
        category = await self.get_category(
            db,
            category_id,
        )

        await self.repository.delete(db, category)

    async def get_category_by_slug(
        self,
        db: AsyncSession,
        slug: str,
    ) -> Category:
        category = await self.repository.get_by_slug(
            db,
            slug,
        )

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found",
            )

        return category
