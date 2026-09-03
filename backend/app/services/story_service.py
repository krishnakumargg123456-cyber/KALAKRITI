from datetime import datetime, timezone
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.story import Story
from app.repositories.story_repository import StoryRepository
from app.schemas.story import StoryCreate, StoryUpdate


class StoryService:
    def __init__(self, db: AsyncSession):
        self.repository = StoryRepository(db)

    async def get_story(self, story_id: UUID) -> Story:
        story = await self.repository.get_by_id(story_id)

        if story is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story not found",
            )

        return story

    async def get_story_by_slug(self, slug: str) -> Story:
        story = await self.repository.get_by_slug(slug)

        if story is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story not found",
            )

        return story

    async def list_artisan_stories(
        self,
        artisan_id: UUID,
        *,
        story_status: str | None = None,
        skip: int = 0,
        limit: int = 50,
    ) -> tuple[list[Story], int]:
        return await self.repository.get_by_artisan(
            artisan_id,
            status=story_status,
            skip=skip,
            limit=limit,
        )

    async def list_admin_stories(
        self,
        *,
        story_status: str | None = None,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Story], int]:
        return await self.repository.get_all(
            status=story_status,
            skip=skip,
            limit=limit,
        )

    async def list_published_stories(
        self,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Story], int]:
        return await self.repository.get_published(
            skip=skip,
            limit=limit,
        )

    async def create_story(
        self,
        artisan_id: UUID,
        data: StoryCreate,
    ) -> Story:
        existing = await self.repository.get_by_slug(data.slug)

        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A story with this slug already exists",
            )

        if data.status == "published":
            published_at = datetime.now(timezone.utc)
            scheduled_at = None

        elif data.status == "scheduled":
            if data.scheduled_at is None:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at is required for scheduled stories",
                )

            if data.scheduled_at <= datetime.now(timezone.utc):
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at must be in the future",
                )

            published_at = None
            scheduled_at = data.scheduled_at

        else:
            published_at = None
            scheduled_at = None

        story = Story(
            artisan_id=artisan_id,
            title=data.title,
            slug=data.slug,
            excerpt=data.excerpt,
            content=data.content,
            cover_image_url=data.cover_image_url,
            status=data.status,
            published_at=published_at,
            scheduled_at=scheduled_at,
        )

        return await self.repository.create(story)

    async def update_story(
        self,
        story_id: UUID,
        artisan_id: UUID,
        data: StoryUpdate,
    ) -> Story:
        story = await self.get_story(story_id)

        if story.artisan_id != artisan_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to modify this story",
            )

        updates = data.model_dump(exclude_unset=True)

        if "slug" in updates and updates["slug"] != story.slug:
            existing = await self.repository.get_by_slug(updates["slug"])

            if existing is not None and existing.id != story.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A story with this slug already exists",
                )

        for field, value in updates.items():
            setattr(story, field, value)

        if "status" in updates:
            if story.status == "published":
                story.published_at = datetime.now(timezone.utc)
                story.scheduled_at = None

            elif story.status == "scheduled":
                if story.scheduled_at is None:
                    raise HTTPException(
                        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail="scheduled_at is required for scheduled stories",
                    )

                if story.scheduled_at <= datetime.now(timezone.utc):
                    raise HTTPException(
                        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail="scheduled_at must be in the future",
                    )

                story.published_at = None

            else:
                story.published_at = None
                story.scheduled_at = None

        elif "scheduled_at" in updates and story.status == "scheduled":
            if story.scheduled_at is None:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at is required for scheduled stories",
                )

            if story.scheduled_at <= datetime.now(timezone.utc):
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at must be in the future",
                )

        return await self.repository.update(story)

    async def delete_story(
        self,
        story_id: UUID,
        artisan_id: UUID,
    ) -> None:
        story = await self.get_story(story_id)

        if story.artisan_id != artisan_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to delete this story",
            )

        await self.repository.delete(story)
