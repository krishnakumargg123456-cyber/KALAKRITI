from __future__ import annotations

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review


class ReviewRepository:

    async def list_by_product(
        self,
        db: AsyncSession,
        *,
        product_id: UUID,
        skip: int = 0,
        limit: int = 20,
    ) -> list[Review]:

        stmt = (
            select(Review)
            .where(Review.product_id == product_id)
            .order_by(Review.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(stmt)

        return list(result.scalars().all())

    async def count_by_product(
        self,
        db: AsyncSession,
        *,
        product_id: UUID,
    ) -> int:

        stmt = select(func.count(Review.id)).where(
            Review.product_id == product_id
        )

        result = await db.execute(stmt)

        return result.scalar_one()

    async def list_by_user(
        self,
        db: AsyncSession,
        *,
        user_id: UUID,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Review], int]:

        stmt = (
            select(Review)
            .where(Review.user_id == user_id)
            .order_by(Review.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(stmt)

        reviews = list(result.scalars().all())

        count_stmt = select(func.count(Review.id)).where(
            Review.user_id == user_id
        )

        count_result = await db.execute(count_stmt)

        total = count_result.scalar_one()

        return reviews, total

    async def get_by_id(
        self,
        db: AsyncSession,
        review_id: int,
    ) -> Review | None:

        result = await db.execute(
            select(Review).where(Review.id == review_id)
        )

        return result.scalar_one_or_none()

    async def get_by_product_and_user(
        self,
        db: AsyncSession,
        *,
        product_id: UUID,
        user_id: UUID,
    ) -> Review | None:

        result = await db.execute(
            select(Review).where(
                Review.product_id == product_id,
                Review.user_id == user_id,
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        review: Review,
    ) -> Review:

        db.add(review)

        await db.flush()
        await db.refresh(review)

        return review

    async def update(
        self,
        db: AsyncSession,
        review: Review,
    ) -> Review:

        await db.flush()
        await db.refresh(review)

        return review

    async def delete(
        self,
        db: AsyncSession,
        review: Review,
    ) -> None:

        await db.delete(review)

        await db.flush()


review_repository = ReviewRepository()
