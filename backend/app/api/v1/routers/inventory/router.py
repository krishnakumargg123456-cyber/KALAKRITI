from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import (
    get_current_user,
    get_db,
    require_product_owner,
)
from app.models.user import User
from app.schemas.inventory import (
    InventoryCreate,
    InventoryResponse,
    InventoryStockResponse,
    InventoryUpdate,
)
from app.services.inventory import (
    create_inventory,
    delete_inventory,
    get_inventory,
    update_inventory,
)


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)


@router.get(
    "/products/{product_id}",
    response_model=InventoryResponse,
    status_code=status.HTTP_200_OK,
)
async def get_product_inventory(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await get_inventory(
        db=db,
        product_id=product_id,
    )


@router.get(
    "/products/{product_id}/stock",
    response_model=InventoryStockResponse,
    status_code=status.HTTP_200_OK,
)
async def get_product_stock(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    inventory = await get_inventory(
        db=db,
        product_id=product_id,
    )

    available_quantity = max(
        0,
        inventory.quantity - inventory.reserved_quantity,
    )

    return {
        "product_id": inventory.product_id,
        "quantity": inventory.quantity,
        "reserved_quantity": inventory.reserved_quantity,
        "available_quantity": available_quantity,
        "low_stock_threshold": inventory.low_stock_threshold,
        "in_stock": available_quantity > 0,
        "low_stock": (
            available_quantity <= inventory.low_stock_threshold
        ),
    }


@router.post(
    "/products/{product_id}",
    response_model=InventoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_product_inventory(
    product_id: UUID,
    data: InventoryCreate,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    return await create_inventory(
        db=db,
        product_id=product_id,
        data=data,
    )


@router.patch(
    "/products/{product_id}",
    response_model=InventoryResponse,
    status_code=status.HTTP_200_OK,
)
async def update_product_inventory(
    product_id: UUID,
    data: InventoryUpdate,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    return await update_inventory(
        db=db,
        product_id=product_id,
        data=data,
    )


@router.delete(
    "/products/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product_inventory(
    product_id: UUID,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    await delete_inventory(
        db=db,
        product_id=product_id,
    )

    return None
