from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


StoryStatus = Literal["draft", "published", "scheduled"]


class StoryCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    slug: str = Field(min_length=3, max_length=220)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str = Field(min_length=10)
    cover_image_url: str | None = Field(default=None, max_length=1000)
    status: StoryStatus = "draft"
    scheduled_at: datetime | None = None

    @field_validator("title", "slug", "content")
    @classmethod
    def validate_required_text(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("This field cannot be empty")

        return value


class StoryUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=200)
    slug: str | None = Field(default=None, min_length=3, max_length=220)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str | None = Field(default=None, min_length=10)
    cover_image_url: str | None = Field(default=None, max_length=1000)
    status: StoryStatus | None = None
    scheduled_at: datetime | None = None

    @field_validator("title", "slug", "content")
    @classmethod
    def validate_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()

        if not value:
            raise ValueError("This field cannot be empty")

        return value


class ArtisanStoryInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    shop_name: str
    bio: str | None
    craft_specialization: str | None
    state: str | None
    district: str | None
    is_verified: bool


class StoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    artisan_id: UUID
    title: str
    slug: str
    excerpt: str | None
    content: str
    cover_image_url: str | None
    status: StoryStatus
    published_at: datetime | None
    scheduled_at: datetime | None
    created_at: datetime
    updated_at: datetime
    artisan: ArtisanStoryInfo


class StoryListResponse(BaseModel):
    items: list[StoryResponse]
    total: int
