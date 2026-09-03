from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import (
    get_current_user,
    get_db,
    require_admin,
)
from app.models.user import User
from app.schemas.notification.notification import (
    NotificationCreate,
    NotificationListResponse,
    NotificationResponse,
)
from app.services.notification.service import NotificationService


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)

service = NotificationService()


@router.get(
    "",
    response_model=NotificationListResponse,
)
async def list_notifications(
    unread_only: bool = Query(False),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    items, total, unread_count = await service.list_for_user(
        db,
        current_user.id,
        skip=skip,
        limit=limit,
        unread_only=unread_only,
    )

    return NotificationListResponse(
        items=items,
        total=total,
        unread_count=unread_count,
    )


@router.get(
    "/{notification_id}",
    response_model=NotificationResponse,
)
async def get_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.get(
        db,
        notification_id,
        current_user.id,
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse,
)
async def mark_notification_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.mark_read(
        db,
        notification_id,
        current_user.id,
    )


@router.patch(
    "/read-all",
)
async def mark_all_notifications_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await service.mark_all_read(
        db,
        current_user.id,
    )

    return {
        "status": "ok",
        "marked_read": count,
    }


@router.delete(
    "/{notification_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await service.delete(
        db,
        notification_id,
        current_user.id,
    )


@router.post(
    "",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_notification(
    data: NotificationCreate,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await service.create(
        db,
        data,
    )
