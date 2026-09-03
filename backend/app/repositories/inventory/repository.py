from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.inventory import Inventory


class InventoryRepository:

    async def get_by_product(
        self,
        db: AsyncSession,
        *,
        product_id: UUID,
    ) -> Inventory | None:

        result = await db.execute(
            select(Inventory).where(
                Inventory.product_id == product_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_id(
        self,
        db: AsyncSession,
        inventory_id: UUID,
    ) -> Inventory | None:

        result = await db.execute(
            select(Inventory).where(
                Inventory.id == inventory_id
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        inventory: Inventory,
    ) -> Inventory:

        db.add(inventory)

        await db.flush()
        await db.refresh(inventory)

        return inventory

    async def update(
        self,
        db: AsyncSession,
        inventory: Inventory,
    ) -> Inventory:

        await db.flush()
        await db.refresh(inventory)

        return inventory

    async def delete(
        self,
        db: AsyncSession,
        inventory: Inventory,
    ) -> None:

        await db.delete(inventory)
        await db.flush()


inventory_repository = InventoryRepository()
