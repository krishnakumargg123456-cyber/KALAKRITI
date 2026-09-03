from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.cart import (
    CartItemCreate,
    CartItemUpdate,
    CartResponse,
)
from app.services.cart.service import (
    add_item,
    build_cart_response,
    clear_cart,
    get_cart,
    remove_item,
    update_item,
)


router = APIRouter(
    prefix="/cart",
    tags=["Cart"],
)


@router.get(
    "",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
)
async def get_my_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cart = await get_cart(db, current_user)

    return build_cart_response(cart)


@router.post(
    "/items",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
)
async def add_cart_item(
    data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cart = await add_item(
        db=db,
        user=current_user,
        product_id=data.product_id,
        quantity=data.quantity,
    )

    return build_cart_response(cart)


@router.patch(
    "/items/{item_id}",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
)
async def update_cart_item(
    item_id: int,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cart = await update_item(
        db=db,
        user=current_user,
        item_id=item_id,
        quantity=data.quantity,
    )

    return build_cart_response(cart)


@router.delete(
    "/items/{item_id}",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cart = await remove_item(
        db=db,
        user=current_user,
        item_id=item_id,
    )

    return build_cart_response(cart)


@router.delete(
    "",
    response_model=CartResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_my_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cart = await clear_cart(db, current_user)

    return build_cart_response(cart)
