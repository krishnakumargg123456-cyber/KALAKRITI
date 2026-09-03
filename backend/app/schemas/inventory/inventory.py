from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class InventoryCreate(BaseModel):
    quantity: int = Field(default=0, ge=0)
    reserved_quantity: int = Field(default=0, ge=0)
    low_stock_threshold: int = Field(default=5, ge=0)


class InventoryUpdate(BaseModel):
    quantity: int | None = Field(default=None, ge=0)
    reserved_quantity: int | None = Field(default=None, ge=0)
    low_stock_threshold: int | None = Field(default=None, ge=0)


class InventoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    quantity: int
    reserved_quantity: int
    low_stock_threshold: int
    created_at: datetime
    updated_at: datetime

    @property
    def available_quantity(self) -> int:
        return max(
            0,
            self.quantity - self.reserved_quantity,
        )


class InventoryStockResponse(BaseModel):
    product_id: UUID
    quantity: int
    reserved_quantity: int
    available_quantity: int
    low_stock_threshold: int
    in_stock: bool
    low_stock: bool
