from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.review import ReviewStatus


class AdminReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: UUID
    user_id: UUID
    rating: int
    title: str | None
    comment: str | None
    status: ReviewStatus
    created_at: datetime
    updated_at: datetime


class AdminReviewStatusUpdate(BaseModel):
    status: ReviewStatus


class AdminReviewListResponse(BaseModel):
    items: list[AdminReviewResponse]
    total: int
    skip: int
    limit: int
