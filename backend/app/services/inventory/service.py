from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.inventory import Inventory
from app.models.product import Product
from app.repositories.inventory import inventory_repository
from app.repositories.product import ProductRepository
from app.schemas.inventory import InventoryCreate, InventoryUpdate


async def get_product_or_404(
    db: AsyncSession,
    product_id: UUID,
) -> Product:

    repository = ProductRepository()

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


async def get_inventory(
    db: AsyncSession,
    *,
    product_id: UUID,
) -> Inventory:

    await get_product_or_404(
        db,
        product_id,
    )

    inventory = await inventory_repository.get_by_product(
        db,
        product_id=product_id,
    )

    if inventory is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory not found",
        )

    return inventory


async def create_inventory(
    db: AsyncSession,
    *,
    product_id: UUID,
    data: InventoryCreate,
) -> Inventory:

    await get_product_or_404(
        db,
        product_id,
    )

    existing = await inventory_repository.get_by_product(
        db,
        product_id=product_id,
    )

    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Inventory already exists for this product",
        )

    if data.reserved_quantity > data.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reserved quantity cannot exceed total quantity",
        )

    inventory = Inventory(
        product_id=product_id,
        quantity=data.quantity,
        reserved_quantity=data.reserved_quantity,
        low_stock_threshold=data.low_stock_threshold,
    )

    try:
        return await inventory_repository.create(
            db,
            inventory,
        )
    except IntegrityError:
        await db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Inventory already exists for this product",
        )


async def update_inventory(
    db: AsyncSession,
    *,
    product_id: UUID,
    data: InventoryUpdate,
) -> Inventory:

    inventory = await get_inventory(
        db,
        product_id=product_id,
    )

    update_data = data.model_dump(
        exclude_unset=True,
    )

    quantity = update_data.get(
        "quantity",
        inventory.quantity,
    )

    reserved_quantity = update_data.get(
        "reserved_quantity",
        inventory.reserved_quantity,
    )

    if reserved_quantity > quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reserved quantity cannot exceed total quantity",
        )

    for field, value in update_data.items():
        setattr(
            inventory,
            field,
            value,
        )

    return await inventory_repository.update(
        db,
        inventory,
    )


async def delete_inventory(
    db: AsyncSession,
    *,
    product_id: UUID,
) -> None:

    inventory = await get_inventory(
        db,
        product_id=product_id,
    )

    await inventory_repository.delete(
        db,
        inventory,
    )
