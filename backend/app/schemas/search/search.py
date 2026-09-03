from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SearchProductItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    slug: str
    description: str | None = None
    price: float
    compare_at_price: float | None = None
    sku: str
    material: str | None = None
    craft_region: str | None = None
    is_featured: bool
    is_active: bool


class SearchResponse(BaseModel):
    items: list[SearchProductItem]
    total: int
    skip: int
    limit: int
    query: str
