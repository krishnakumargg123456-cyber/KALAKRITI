from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review, ReviewStatus
from app.schemas.admin_review import AdminReviewStatusUpdate


class AdminReviewService:
    async def list_reviews(
        self,
        db: AsyncSession,
        *,
        review_status: ReviewStatus | None = None,
        rating: int | None = None,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Review], int]:
        query = select(Review).order_by(Review.created_at.desc())

        if review_status is not None:
            query = query.where(Review.status == review_status)

        if rating is not None:
            query = query.where(Review.rating == rating)

        count_query = select(func.count()).select_from(query.subquery())
        total = await db.scalar(count_query)

        result = await db.execute(
            query.offset(skip).limit(limit)
        )

        return list(result.scalars().all()), int(total or 0)

    async def get_review(
        self,
        db: AsyncSession,
        review_id: int,
    ) -> Review | None:
        result = await db.execute(
            select(Review).where(Review.id == review_id)
        )
        return result.scalar_one_or_none()

    async def update_status(
        self,
        db: AsyncSession,
        review_id: int,
        data: AdminReviewStatusUpdate,
    ) -> Review | None:
        review = await self.get_review(db, review_id)

        if review is None:
            return None

        review.status = data.status

        await db.commit()
        await db.refresh(review)

        return review

    async def delete_review(
        self,
        db: AsyncSession,
        review_id: int,
    ) -> Review | None:
        review = await self.get_review(db, review_id)

        if review is None:
            return None

        await db.delete(review)
        await db.commit()

        return review


admin_review_service = AdminReviewService()
