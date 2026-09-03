from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.moderation import ModerationItem
from app.models.product import Product
from app.schemas.moderation import (
    ModerationCreate,
    ModerationPriority,
    ModerationReject,
    ModerationStatus,
)


class ModerationService:

    async def list_items(
        self,
        db: AsyncSession,
        *,
        status: ModerationStatus | None = None,
        content_type: str | None = None,
        priority: ModerationPriority | None = None,
    ) -> list[ModerationItem]:

        query = select(ModerationItem).order_by(
            ModerationItem.created_at.desc()
        )

        if status is not None:
            query = query.where(
                ModerationItem.status == status.value
            )

        if content_type is not None:
            query = query.where(
                ModerationItem.content_type == content_type
            )

        if priority is not None:
            query = query.where(
                ModerationItem.priority == priority.value
            )

        result = await db.execute(query)

        return list(result.scalars().all())

    async def get_item(
        self,
        db: AsyncSession,
        item_id: int,
    ) -> ModerationItem | None:

        result = await db.execute(
            select(ModerationItem).where(
                ModerationItem.id == item_id
            )
        )

        return result.scalar_one_or_none()

    async def create_item(
        self,
        db: AsyncSession,
        data: ModerationCreate,
    ) -> ModerationItem:

        item = ModerationItem(
            content_type=data.content_type.value,
            content_id=data.content_id,
            submitted_by=data.submitted_by,
            title=data.title,
            description=data.description,
            image_url=data.image_url,
            status=ModerationStatus.PENDING.value,
            priority=data.priority.value,
        )

        db.add(item)

        await db.commit()
        await db.refresh(item)

        return item

    async def approve_item(
        self,
        db: AsyncSession,
        item_id: int,
        admin_id: UUID,
    ) -> ModerationItem | None:

        item = await self.get_item(
            db,
            item_id,
        )

        if item is None:
            return None

        item.status = ModerationStatus.APPROVED.value
        item.reviewed_by = admin_id
        item.reviewed_at = datetime.now(timezone.utc)
        item.rejection_reason = None

        if item.content_type == "Product":
            try:
                product_id = UUID(item.content_id)
            except ValueError:
                raise ValueError(
                    "Invalid product ID in moderation item"
                )

            result = await db.execute(
                select(Product).where(
                    Product.id == product_id
                )
            )

            product = result.scalar_one_or_none()

            if product is not None:
                product.status = "Approved"
                product.is_active = True

        await db.commit()
        await db.refresh(item)

        return item

    async def reject_item(
        self,
        db: AsyncSession,
        item_id: int,
        admin_id: UUID,
        data: ModerationReject,
    ) -> ModerationItem | None:

        item = await self.get_item(
            db,
            item_id,
        )

        if item is None:
            return None

        item.status = ModerationStatus.REJECTED.value
        item.reviewed_by = admin_id
        item.reviewed_at = datetime.now(timezone.utc)
        item.rejection_reason = data.reason

        if item.content_type == "Product":
            try:
                product_id = UUID(item.content_id)
            except ValueError:
                raise ValueError(
                    "Invalid product ID in moderation item"
                )

            result = await db.execute(
                select(Product).where(
                    Product.id == product_id
                )
            )

            product = result.scalar_one_or_none()

            if product is not None:
                product.status = "Rejected"
                product.is_active = False
                product.is_featured = False

        await db.commit()
        await db.refresh(item)

        return item


moderation_service = ModerationService()
