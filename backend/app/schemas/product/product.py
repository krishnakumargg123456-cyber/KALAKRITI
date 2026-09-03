from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ProductImageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    image_url: str
    alt_text: str | None = None
    sort_order: int
    is_primary: bool


class ProductCreate(BaseModel):
    category_id: UUID
    name: str = Field(min_length=2, max_length=200)
    slug: str = Field(min_length=2, max_length=220)
    description: str | None = None
    price: Decimal = Field(
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    compare_at_price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    sku: str = Field(min_length=1, max_length=80)
    material: str | None = Field(
        default=None,
        max_length=150,
    )
    dimensions: str | None = Field(
        default=None,
        max_length=150,
    )
    craft_region: str | None = Field(
        default=None,
        max_length=150,
    )


class ProductUpdate(BaseModel):
    category_id: UUID | None = None
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=200,
    )
    slug: str | None = Field(
        default=None,
        min_length=2,
        max_length=220,
    )
    description: str | None = None
    price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    compare_at_price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    sku: str | None = Field(
        default=None,
        min_length=1,
        max_length=80,
    )
    material: str | None = Field(
        default=None,
        max_length=150,
    )
    dimensions: str | None = Field(
        default=None,
        max_length=150,
    )
    craft_region: str | None = Field(
        default=None,
        max_length=150,
    )


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    artisan_id: UUID
    category_id: UUID

    name: str
    slug: str
    description: str | None

    price: Decimal
    compare_at_price: Decimal | None

    sku: str
    material: str | None
    dimensions: str | None
    craft_region: str | None

    status: str
    is_featured: bool
    is_active: bool

    artisan_name: str | None = None
    category_name: str | None = None

    stock: int = 0
    available_stock: int = 0

    images: list[ProductImageResponse] = Field(
        default_factory=list
    )
