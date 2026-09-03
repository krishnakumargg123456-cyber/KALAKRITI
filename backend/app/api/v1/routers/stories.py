from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.schemas.story import StoryListResponse, StoryResponse
from app.services.story_service import StoryService


router = APIRouter(
    prefix="/stories",
    tags=["Stories"],
)


@router.get(
    "",
    response_model=StoryListResponse,
    status_code=status.HTTP_200_OK,
)
async def list_published_stories(
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
) -> StoryListResponse:
    service = StoryService(db)

    stories, total = await service.list_published_stories(
        skip=skip,
        limit=limit,
    )

    return StoryListResponse(
        items=stories,
        total=total,
    )


@router.get(
    "/{slug}",
    response_model=StoryResponse,
    status_code=status.HTTP_200_OK,
)
async def get_published_story(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> StoryResponse:
    service = StoryService(db)

    story = await service.get_story_by_slug(slug)

    if story.status != "published":
        from fastapi import HTTPException

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Story not found",
        )

    return story
