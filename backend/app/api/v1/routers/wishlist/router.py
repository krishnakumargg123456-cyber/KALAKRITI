from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.wishlist import WishlistResponse
from app.services.wishlist.service import (
    add_item,
    clear_wishlist,
    get_wishlist,
    move_item_to_cart,
    remove_item,
)


router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"],
)


def build_wishlist_response(wishlist) -> dict:
    return {
        "id": wishlist.id,
        "user_id": wishlist.user_id,
        "items": wishlist.items,
    }


@router.get(
    "",
    response_model=WishlistResponse,
    status_code=status.HTTP_200_OK,
)
async def get_my_wishlist(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    wishlist = await get_wishlist(db, current_user)

    return build_wishlist_response(wishlist)


@router.post(
    "/items/{product_id}",
    response_model=WishlistResponse,
    status_code=status.HTTP_200_OK,
)
async def add_wishlist_item(
    product_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    wishlist = await add_item(
        db=db,
        user=current_user,
        product_id=product_id,
    )

    return build_wishlist_response(wishlist)


@router.delete(
    "/items/{product_id}",
    response_model=WishlistResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_wishlist_item(
    product_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    wishlist = await remove_item(
        db=db,
        user=current_user,
        product_id=product_id,
    )

    return build_wishlist_response(wishlist)


@router.delete(
    "",
    response_model=WishlistResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_my_wishlist(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    wishlist = await clear_wishlist(db, current_user)

    return build_wishlist_response(wishlist)


@router.post(
    "/items/{product_id}/move-to-cart",
    response_model=WishlistResponse,
    status_code=status.HTTP_200_OK,
)
async def move_wishlist_item_to_cart(
    product_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    wishlist = await move_item_to_cart(
        db=db,
        user=current_user,
        product_id=product_id,
    )

    return build_wishlist_response(wishlist)
