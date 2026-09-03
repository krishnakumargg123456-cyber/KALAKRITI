from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.user import User
from app.schemas.moderation import (
    ModerationContentType,
    ModerationCreate,
    ModerationPriority,
    ModerationReject,
    ModerationResponse,
    ModerationStatus,
)
from app.services.moderation.service import moderation_service


router = APIRouter(
    prefix="/moderation",
    tags=["Admin Moderation"],
)


@router.get(
    "",
    response_model=list[ModerationResponse],
)
async def list_moderation_items(
    moderation_status: ModerationStatus | None = Query(
        default=None,
        alias="status",
    ),
    content_type: ModerationContentType | None = None,
    priority: ModerationPriority | None = None,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[ModerationResponse]:
    items = await moderation_service.list_items(
        db,
        status=moderation_status,
        content_type=content_type.value if content_type else None,
        priority=priority,
    )

    return [
        ModerationResponse.model_validate(item)
        for item in items
    ]


@router.get(
    "/{item_id}",
    response_model=ModerationResponse,
)
async def get_moderation_item(
    item_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ModerationResponse:
    item = await moderation_service.get_item(db, item_id)

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Moderation item not found",
        )

    return ModerationResponse.model_validate(item)


@router.post(
    "",
    response_model=ModerationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_moderation_item(
    data: ModerationCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ModerationResponse:
    item = await moderation_service.create_item(db, data)

    return ModerationResponse.model_validate(item)


@router.patch(
    "/{item_id}/approve",
    response_model=ModerationResponse,
)
async def approve_moderation_item(
    item_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
) -> ModerationResponse:
    item = await moderation_service.approve_item(
        db,
        item_id,
        admin.id,
    )

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Moderation item not found",
        )

    return ModerationResponse.model_validate(item)


@router.patch(
    "/{item_id}/reject",
    response_model=ModerationResponse,
)
async def reject_moderation_item(
    item_id: int,
    data: ModerationReject,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
) -> ModerationResponse:
    item = await moderation_service.reject_item(
        db,
        item_id,
        admin.id,
        data,
    )

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Moderation item not found",
        )

    return ModerationResponse.model_validate(item)

