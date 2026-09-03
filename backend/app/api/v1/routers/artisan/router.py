from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import get_current_user, require_admin
from app.models.user import User
from app.schemas.artisan.artisan import (
    ArtisanCreate,
    ArtisanMeCreate,
    ArtisanMeUpdate,
    ArtisanResponse,
    ArtisanUpdate,
)
from app.services.artisan.service import ArtisanService


router = APIRouter(
    prefix="/artisans",
    tags=["Artisans"],
)

service = ArtisanService()


@router.get(
    "",
    response_model=list[ArtisanResponse],
)
async def list_artisans(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    is_active: bool | None = Query(default=True),
    is_verified: bool | None = Query(default=None),
):
    artisans, _ = await service.list_artisans(
        db,
        skip=skip,
        limit=limit,
        is_active=is_active,
        is_verified=is_verified,
    )

    return artisans


# IMPORTANT:
# /me routes must come before /{artisan_id}
@router.get(
    "/me",
    response_model=ArtisanResponse,
)
async def get_my_artisan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.get_my_artisan(
        db,
        current_user,
    )


@router.post(
    "/me",
    response_model=ArtisanResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_my_artisan(
    data: ArtisanMeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.create_my_artisan(
        db,
        current_user,
        data,
    )


@router.patch(
    "/me",
    response_model=ArtisanResponse,
)
async def update_my_artisan(
    data: ArtisanMeUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_my_artisan(
        db,
        current_user,
        data,
    )


# Public artisan profile
@router.get(
    "/{artisan_id}",
    response_model=ArtisanResponse,
)
async def get_artisan(
    artisan_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await service.get_artisan(
        db,
        artisan_id,
    )


# Admin-only legacy create endpoint
@router.post(
    "",
    response_model=ArtisanResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_artisan(
    data: ArtisanCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await service.create_artisan(
        db,
        data,
    )


# Admin-only update endpoint
@router.patch(
    "/{artisan_id}",
    response_model=ArtisanResponse,
)
async def update_artisan(
    artisan_id: UUID,
    data: ArtisanUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await service.update_artisan(
        db,
        artisan_id,
        data,
    )


# Admin-only delete endpoint
@router.delete(
    "/{artisan_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_artisan(
    artisan_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    await service.delete_artisan(
        db,
        artisan_id,
    )
