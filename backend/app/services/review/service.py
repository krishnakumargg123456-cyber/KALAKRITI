from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.models.user import User
from app.repositories.review.repository import review_repository
from app.schemas.review import (
    ReviewCreate,
    ReviewListResponse,
    ReviewResponse,
    ReviewUpdate,
)
from app.services.product.service import ProductService


async def list_product_reviews(
    db: AsyncSession,
    *,
    product_id: UUID,
    skip: int = 0,
    limit: int = 20,
) -> tuple[list[Review], int]:

    await ProductService().get_product(db, product_id)

    reviews = await review_repository.list_by_product(
        db=db,
        product_id=product_id,
        skip=skip,
        limit=limit,
    )

    total = await review_repository.count_by_product(
        db=db,
        product_id=product_id,
    )

    return reviews, total


async def list_user_reviews(
    db: AsyncSession,
    *,
    user_id: UUID,
    skip: int = 0,
    limit: int = 20,
) -> tuple[list[Review], int]:

    return await review_repository.list_by_user(
        db=db,
        user_id=user_id,
        skip=skip,
        limit=limit,
    )


async def create_review(
    db: AsyncSession,
    *,
    product_id: UUID,
    user: User,
    data: ReviewCreate,
) -> Review:

    await ProductService().get_product(db, product_id)

    existing = await review_repository.get_by_product_and_user(
        db=db,
        product_id=product_id,
        user_id=user.id,
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already reviewed this product.",
        )

    review = Review(
        product_id=product_id,
        user_id=user.id,
        rating=data.rating,
        title=data.title,
        comment=data.comment,
    )

    return await review_repository.create(
        db=db,
        review=review,
    )


async def update_review(
    db: AsyncSession,
    *,
    review_id: int,
    user: User,
    data: ReviewUpdate,
) -> Review:

    review = await review_repository.get_by_id(
        db=db,
        review_id=review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found.",
        )

    if review.user_id != user.id and not getattr(user, "is_admin", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this review.",
        )

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(review, field, value)

    return await review_repository.update(
        db=db,
        review=review,
    )


async def delete_review(
    db: AsyncSession,
    *,
    review_id: int,
    user: User,
) -> None:

    review = await review_repository.get_by_id(
        db=db,
        review_id=review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found.",
        )

    if review.user_id != user.id and not getattr(user, "is_admin", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this review.",
        )

    await review_repository.delete(
        db=db,
        review=review,
    )

