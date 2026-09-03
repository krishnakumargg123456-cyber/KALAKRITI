from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.review import ReviewStatus
from app.models.user import User
from app.schemas.admin_review import (
    AdminReviewListResponse,
    AdminReviewResponse,
    AdminReviewStatusUpdate,
)
from app.services.admin_review import admin_review_service


router = APIRouter(
    prefix="/reviews",
    tags=["Admin Reviews"],
)


@router.get(
    "",
    response_model=AdminReviewListResponse,
    status_code=status.HTTP_200_OK,
)
async def list_admin_reviews(
    review_status: ReviewStatus | None = Query(
        default=None,
        alias="status",
    ),
    rating: int | None = Query(
        default=None,
        ge=1,
        le=5,
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
) -> AdminReviewListResponse:
    reviews, total = await admin_review_service.list_reviews(
        db,
        review_status=review_status,
        rating=rating,
        skip=skip,
        limit=limit,
    )

    return AdminReviewListResponse(
        items=[
            AdminReviewResponse.model_validate(review)
            for review in reviews
        ],
        total=total,
        skip=skip,
        limit=limit,
    )


@router.get(
    "/{review_id}",
    response_model=AdminReviewResponse,
    status_code=status.HTTP_200_OK,
)
async def get_admin_review(
    review_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminReviewResponse:
    review = await admin_review_service.get_review(
        db,
        review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    return AdminReviewResponse.model_validate(review)


@router.patch(
    "/{review_id}/status",
    response_model=AdminReviewResponse,
    status_code=status.HTTP_200_OK,
)
async def update_admin_review_status(
    review_id: int,
    data: AdminReviewStatusUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminReviewResponse:
    review = await admin_review_service.update_status(
        db,
        review_id,
        data,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    return AdminReviewResponse.model_validate(review)


@router.delete(
    "/{review_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_admin_review(
    review_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> dict[str, str]:
    review = await admin_review_service.delete_review(
        db,
        review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    return {"message": "Review deleted successfully"}
