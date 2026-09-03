from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    slug: str = Field(min_length=2, max_length=140)
    description: str | None = Field(default=None, max_length=500)
    parent_id: UUID | None = None
    is_active: bool = True


class CategoryUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    slug: str | None = Field(default=None, min_length=2, max_length=140)
    description: str | None = Field(default=None, max_length=500)
    parent_id: UUID | None = None
    is_active: bool | None = None


class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    parent_id: UUID | None
    name: str
    slug: str
    description: str | None
    is_active: bool
