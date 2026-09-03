from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification
from app.repositories.notification.repository import NotificationRepository
from app.schemas.notification.notification import NotificationCreate


class NotificationService:

    def __init__(self) -> None:
        self.repository = NotificationRepository()

    async def create(
        self,
        db: AsyncSession,
        data: NotificationCreate,
    ) -> Notification:

        notification = Notification(
            user_id=UUID(data.user_id),
            title=data.title,
            message=data.message,
            type=data.type,
        )

        return await self.repository.create(
            db,
            notification,
        )

    async def list_for_user(
        self,
        db: AsyncSession,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
        unread_only: bool = False,
    ):
        items = await self.repository.list_for_user(
            db,
            user_id,
            skip=skip,
            limit=limit,
            unread_only=unread_only,
        )

        total = await self.repository.count_for_user(
            db,
            user_id,
            unread_only=unread_only,
        )

        unread_count = await self.repository.count_for_user(
            db,
            user_id,
            unread_only=True,
        )

        return items, total, unread_count

    async def get(
        self,
        db: AsyncSession,
        notification_id: int,
        user_id: UUID,
    ) -> Notification:

        notification = await self.repository.get_by_id(
            db,
            notification_id,
        )

        if not notification:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found",
            )

        if notification.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this notification",
            )

        return notification

    async def mark_read(
        self,
        db: AsyncSession,
        notification_id: int,
        user_id: UUID,
    ) -> Notification:

        notification = await self.get(
            db,
            notification_id,
            user_id,
        )

        if not notification.is_read:
            notification = await self.repository.mark_read(
                db,
                notification,
            )

        return notification

    async def mark_all_read(
        self,
        db: AsyncSession,
        user_id: UUID,
    ) -> int:

        return await self.repository.mark_all_read(
            db,
            user_id,
        )

    async def delete(
        self,
        db: AsyncSession,
        notification_id: int,
        user_id: UUID,
    ) -> None:

        notification = await self.get(
            db,
            notification_id,
            user_id,
        )

        await self.repository.delete(
            db,
            notification,
        )
