from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ArtisanCreate(BaseModel):
    user_id: UUID

    shop_name: str = Field(
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    craft_specialization: str | None = Field(
        default=None,
        max_length=150,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    district: str | None = Field(
        default=None,
        max_length=100,
    )


class ArtisanMeCreate(BaseModel):
    shop_name: str = Field(
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    craft_specialization: str | None = Field(
        default=None,
        max_length=150,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    district: str | None = Field(
        default=None,
        max_length=100,
    )


class ArtisanUpdate(BaseModel):
    shop_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    craft_specialization: str | None = Field(
        default=None,
        max_length=150,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    district: str | None = Field(
        default=None,
        max_length=100,
    )

    is_verified: bool | None = None
    is_active: bool | None = None


class ArtisanMeUpdate(BaseModel):
    shop_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    craft_specialization: str | None = Field(
        default=None,
        max_length=150,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    district: str | None = Field(
        default=None,
        max_length=100,
    )


class ArtisanResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID

    shop_name: str
    bio: str | None

    craft_specialization: str | None
    state: str | None
    district: str | None

    is_verified: bool
    is_active: bool



