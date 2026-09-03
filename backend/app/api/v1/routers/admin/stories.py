from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.user import User
from app.schemas.story import StoryListResponse, StoryResponse, StoryUpdate
from app.services.story_service import StoryService


router = APIRouter(
    prefix="/stories",
    tags=["Admin Stories"],
)


@router.get(
    "",
    response_model=StoryListResponse,
    status_code=status.HTTP_200_OK,
)
async def list_admin_stories(
    story_status: str | None = Query(
        default=None,
        alias="status",
        pattern="^(draft|published|scheduled)$",
    ),
    skip: int = Query(
        default=0,
        ge=0,
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
    ),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> StoryListResponse:
    service = StoryService(db)

    stories, total = await service.list_admin_stories(
        story_status=story_status,
        skip=skip,
        limit=limit,
    )

    return StoryListResponse(
        items=stories,
        total=total,
    )


@router.get(
    "/{story_id}",
    response_model=StoryResponse,
    status_code=status.HTTP_200_OK,
)
async def get_admin_story(
    story_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> StoryResponse:
    service = StoryService(db)

    story = await service.get_story(story_id)

    return story


@router.patch(
    "/{story_id}",
    response_model=StoryResponse,
    status_code=status.HTTP_200_OK,
)
async def update_admin_story(
    story_id: UUID,
    data: StoryUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> StoryResponse:
    service = StoryService(db)

    story = await service.get_story(story_id)

    updates = data.model_dump(exclude_unset=True)

    if "slug" in updates and updates["slug"] != story.slug:
        existing = await service.repository.get_by_slug(updates["slug"])

        if existing is not None and existing.id != story.id:
            from fastapi import HTTPException

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A story with this slug already exists",
            )

    for field, value in updates.items():
        setattr(story, field, value)

    if "status" in updates:
        from datetime import datetime, timezone

        if story.status == "published":
            story.published_at = datetime.now(timezone.utc)
            story.scheduled_at = None

        elif story.status == "scheduled":
            if story.scheduled_at is None:
                from fastapi import HTTPException

                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at is required for scheduled stories",
                )

            if story.scheduled_at <= datetime.now(timezone.utc):
                from fastapi import HTTPException

                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="scheduled_at must be in the future",
                )

            story.published_at = None

        else:
            story.published_at = None
            story.scheduled_at = None

    elif "scheduled_at" in updates and story.status == "scheduled":
        from datetime import datetime, timezone
        from fastapi import HTTPException

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

    return await service.repository.update(story)


@router.delete(
    "/{story_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_admin_story(
    story_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> dict[str, str]:
    service = StoryService(db)

    story = await service.get_story(story_id)

    await service.repository.delete(story)

    return {"message": "Story deleted successfully"}
