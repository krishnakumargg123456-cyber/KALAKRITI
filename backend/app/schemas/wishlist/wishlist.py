from __future__ import annotations

import uuid
from pydantic import BaseModel, ConfigDict


class WishlistItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: uuid.UUID


class WishlistResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: uuid.UUID
    items: list[WishlistItemResponse]
