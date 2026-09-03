from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.order.order import OrderCreate, OrderResponse
from app.services.order.service import (
    create_order_from_cart,
    get_my_orders,
    get_order,
)


router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_order(
    data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_order_from_cart(
        db=db,
        user=current_user,
        shipping_full_name=data.shipping_full_name,
        shipping_phone=data.shipping_phone,
        shipping_address_line1=data.shipping_address_line1,
        shipping_address_line2=data.shipping_address_line2,
        shipping_city=data.shipping_city,
        shipping_state=data.shipping_state,
        shipping_postal_code=data.shipping_postal_code,
        shipping_country=data.shipping_country,
        notes=data.notes,
    )


@router.get(
    "",
    response_model=list[OrderResponse],
    status_code=status.HTTP_200_OK,
)
async def get_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_my_orders(
        db=db,
        user=current_user,
    )


@router.get(
    "/{order_id}",
    response_model=OrderResponse,
    status_code=status.HTTP_200_OK,
)
async def get_single_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_order(
        db=db,
        user=current_user,
        order_id=order_id,
    )
