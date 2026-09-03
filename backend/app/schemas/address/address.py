from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class AddressCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=5, max_length=20)
    address_line1: str = Field(min_length=1, max_length=255)
    address_line2: str | None = Field(default=None, max_length=255)
    landmark: str | None = Field(default=None, max_length=150)
    city: str = Field(min_length=1, max_length=100)
    district: str | None = Field(default=None, max_length=100)
    state: str = Field(min_length=1, max_length=100)
    postal_code: str = Field(min_length=3, max_length=10)
    country: str = Field(default="India", min_length=1, max_length=100)
    is_default: bool = False


class AddressUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=1, max_length=120)
    phone: str | None = Field(default=None, min_length=5, max_length=20)
    address_line1: str | None = Field(default=None, min_length=1, max_length=255)
    address_line2: str | None = Field(default=None, max_length=255)
    landmark: str | None = Field(default=None, max_length=150)
    city: str | None = Field(default=None, min_length=1, max_length=100)
    district: str | None = Field(default=None, max_length=100)
    state: str | None = Field(default=None, min_length=1, max_length=100)
    postal_code: str | None = Field(default=None, min_length=3, max_length=10)
    country: str | None = Field(default=None, min_length=1, max_length=100)
    is_default: bool | None = None


class AddressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: UUID
    full_name: str
    phone: str
    address_line1: str
    address_line2: str | None
    landmark: str | None
    city: str
    district: str | None
    state: str
    postal_code: str
    country: str
    is_default: bool
    created_at: datetime
    updated_at: datetime
