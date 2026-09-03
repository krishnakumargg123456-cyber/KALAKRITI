from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, require_artisan
from app.models.artisan import Artisan
from app.models.user import User
from app.schemas.story import StoryCreate, StoryListResponse, StoryResponse, StoryUpdate
from app.services.story_service import StoryService


router = APIRouter(
    prefix="/artisan/stories",
    tags=["Artisan Stories"],
)


async def get_current_artisan(
    current_user: User = Depends(require_artisan),
    db: AsyncSession = Depends(get_db),
) -> Artisan:
    result = await db.execute(
        select(Artisan).where(
            Artisan.user_id == current_user.id,
            Artisan.is_active.is_(True),
        )
    )

    artisan = result.scalar_one_or_none()

    if artisan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Artisan profile not found",
        )

    return artisan


@router.get(
    "",
    response_model=StoryListResponse,
)
async def list_my_stories(
    artisan: Artisan = Depends(get_current_artisan),
    db: AsyncSession = Depends(get_db),
    story_status: str | None = Query(
        default=None,
        pattern="^(draft|published|scheduled)$",
    ),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
):
    service = StoryService(db)

    stories, total = await service.list_artisan_stories(
        artisan.id,
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
)
async def get_my_story(
    story_id: UUID,
    artisan: Artisan = Depends(get_current_artisan),
    db: AsyncSession = Depends(get_db),
):
    service = StoryService(db)

    story = await service.get_story(story_id)

    if story.artisan_id != artisan.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this story",
        )

    return story


@router.post(
    "",
    response_model=StoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_my_story(
    data: StoryCreate,
    artisan: Artisan = Depends(get_current_artisan),
    db: AsyncSession = Depends(get_db),
):
    service = StoryService(db)

    return await service.create_story(
        artisan.id,
        data,
    )


@router.patch(
    "/{story_id}",
    response_model=StoryResponse,
)
async def update_my_story(
    story_id: UUID,
    data: StoryUpdate,
    artisan: Artisan = Depends(get_current_artisan),
    db: AsyncSession = Depends(get_db),
):
    service = StoryService(db)

    return await service.update_story(
        story_id,
        artisan.id,
        data,
    )


@router.delete(
    "/{story_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_my_story(
    story_id: UUID,
    artisan: Artisan = Depends(get_current_artisan),
    db: AsyncSession = Depends(get_db),
):
    service = StoryService(db)

    await service.delete_story(
        story_id,
        artisan.id,
    )
