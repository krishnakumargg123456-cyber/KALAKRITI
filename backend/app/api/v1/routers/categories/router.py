from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.schemas.category.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.services.category.service import CategoryService


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)

service = CategoryService()


@router.get(
    "",
    response_model=list[CategoryResponse],
)
async def get_categories(
    active_only: bool = Query(True),
    db: AsyncSession = Depends(get_db),
):
    return await service.list_categories(
        db,
        active_only=active_only,
    )


@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
async def get_category(
    category_id: str,
    db: AsyncSession = Depends(get_db),
):
    try:
        parsed_id = UUID(category_id)
    except ValueError:
        return await service.get_category_by_slug(
            db,
            category_id,
        )

    return await service.get_category(
        db,
        parsed_id,
    )


@router.post(
    "",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_category(
    data: CategoryCreate,
    db: AsyncSession = Depends(get_db),
):
    category = await service.create_category(
        db,
        data,
    )

    await db.commit()

    return category


@router.patch(
    "/{category_id}",
    response_model=CategoryResponse,
)
async def update_category(
    category_id: UUID,
    data: CategoryUpdate,
    db: AsyncSession = Depends(get_db),
):
    category = await service.update_category(
        db,
        category_id,
        data,
    )

    await db.commit()

    return category


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_category(
    category_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    await service.delete_category(
        db,
        category_id,
    )

    await db.commit()
