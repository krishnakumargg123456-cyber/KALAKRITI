from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    title: str | None = Field(default=None, max_length=255)
    comment: str | None = Field(default=None)


class ReviewUpdate(BaseModel):
    rating: int | None = Field(default=None, ge=1, le=5)
    title: str | None = Field(default=None, max_length=255)
    comment: str | None = Field(default=None)


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: UUID
    user_id: UUID
    rating: int
    title: str | None
    comment: str | None
    created_at: datetime
    updated_at: datetime


class ReviewListResponse(BaseModel):
    items: list[ReviewResponse]
    total: int
    skip: int
    limit: int
