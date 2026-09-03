from uuid import UUID

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification


class NotificationRepository:

    async def create(
        self,
        db: AsyncSession,
        notification: Notification,
    ) -> Notification:
        db.add(notification)
        await db.commit()
        await db.refresh(notification)
        return notification

    async def get_by_id(
        self,
        db: AsyncSession,
        notification_id: int,
    ) -> Notification | None:
        result = await db.execute(
            select(Notification).where(
                Notification.id == notification_id
            )
        )
        return result.scalar_one_or_none()

    async def list_for_user(
        self,
        db: AsyncSession,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
        unread_only: bool = False,
    ) -> list[Notification]:

        query = select(Notification).where(
            Notification.user_id == user_id
        )

        if unread_only:
            query = query.where(
                Notification.is_read.is_(False)
            )

        query = (
            query
            .order_by(Notification.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(query)
        return list(result.scalars().all())

    async def count_for_user(
        self,
        db: AsyncSession,
        user_id: UUID,
        *,
        unread_only: bool = False,
    ) -> int:

        query = select(func.count(Notification.id)).where(
            Notification.user_id == user_id
        )

        if unread_only:
            query = query.where(
                Notification.is_read.is_(False)
            )

        result = await db.execute(query)
        return int(result.scalar_one())

    async def mark_as_read(
        self,
        db: AsyncSession,
        notification: Notification,
    ) -> Notification:

        notification.is_read = True

        await db.commit()
        await db.refresh(notification)

        return notification

    async def mark_all_as_read(
        self,
        db: AsyncSession,
        user_id: UUID,
    ) -> int:

        notifications = await self.list_for_user(
            db,
            user_id,
            skip=0,
            limit=10000,
            unread_only=True,
        )

        for notification in notifications:
            notification.is_read = True

        await db.commit()

        return len(notifications)

    async def delete(
        self,
        db: AsyncSession,
        notification: Notification,
    ) -> None:

        await db.delete(notification)
        await db.commit()
