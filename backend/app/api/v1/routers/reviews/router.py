from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.review import (
    ReviewCreate,
    ReviewListResponse,
    ReviewResponse,
    ReviewUpdate,
)
from app.services.review import (
    create_review,
    delete_review,
    list_product_reviews,
    list_user_reviews,
    update_review,
)

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
)


@router.get(
    "/products/{product_id}",
    response_model=ReviewListResponse,
    status_code=status.HTTP_200_OK,
)
async def get_product_reviews(
    product_id: UUID,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    reviews, total = await list_product_reviews(
        db=db,
        product_id=product_id,
        skip=skip,
        limit=limit,
    )

    return {
        "items": reviews,
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get(
    "/me",
    response_model=ReviewListResponse,
    status_code=status.HTTP_200_OK,
)
async def get_my_reviews(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    reviews, total = await list_user_reviews(
        db=db,
        user_id=current_user.id,
        skip=skip,
        limit=limit,
    )

    return {
        "items": reviews,
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.post(
    "/products/{product_id}",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_product_review(
    product_id: UUID,
    data: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_review(
        db=db,
        product_id=product_id,
        user=current_user,
        data=data,
    )


@router.patch(
    "/{review_id}",
    response_model=ReviewResponse,
    status_code=status.HTTP_200_OK,
)
async def update_product_review(
    review_id: int,
    data: ReviewUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_review(
        db=db,
        review_id=review_id,
        user=current_user,
        data=data,
    )


@router.delete(
    "/{review_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product_review(
    review_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await delete_review(
        db=db,
        review_id=review_id,
        user=current_user,
    )

    return None
