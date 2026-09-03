from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.story import Story


class StoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, story_id: UUID) -> Story | None:
        result = await self.db.execute(
            select(Story).where(Story.id == story_id)
        )
        return result.scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> Story | None:
        result = await self.db.execute(
            select(Story).where(Story.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_by_artisan(
        self,
        artisan_id: UUID,
        *,
        status: str | None = None,
        skip: int = 0,
        limit: int = 50,
    ) -> tuple[list[Story], int]:
        query = select(Story).where(Story.artisan_id == artisan_id)

        count_query = select(func.count()).select_from(Story).where(
            Story.artisan_id == artisan_id
        )

        if status is not None:
            query = query.where(Story.status == status)
            count_query = count_query.where(Story.status == status)

        query = query.order_by(Story.created_at.desc())
        query = query.offset(skip).limit(limit)

        result = await self.db.execute(query)
        count_result = await self.db.execute(count_query)

        return list(result.scalars().all()), count_result.scalar_one()

    async def get_all(
        self,
        *,
        status: str | None = None,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Story], int]:
        query = select(Story)
        count_query = select(func.count()).select_from(Story)

        if status is not None:
            query = query.where(Story.status == status)
            count_query = count_query.where(Story.status == status)

        query = (
            query
            .order_by(Story.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await self.db.execute(query)
        count_result = await self.db.execute(count_query)

        return list(result.scalars().all()), count_result.scalar_one()

    async def get_published(
        self,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Story], int]:
        base_filter = Story.status == "published"

        query = (
            select(Story)
            .where(base_filter)
            .order_by(Story.published_at.desc(), Story.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        count_query = (
            select(func.count())
            .select_from(Story)
            .where(base_filter)
        )

        result = await self.db.execute(query)
        count_result = await self.db.execute(count_query)

        return list(result.scalars().all()), count_result.scalar_one()

    async def create(self, story: Story) -> Story:
        self.db.add(story)
        await self.db.flush()
        await self.db.refresh(story)
        return story

    async def update(self, story: Story) -> Story:
        await self.db.flush()
        await self.db.refresh(story)
        return story

    async def delete(self, story: Story) -> None:
        await self.db.delete(story)
        await self.db.flush()
