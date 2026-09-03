from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.address import AddressCreate, AddressResponse, AddressUpdate
from app.services.address import (
    create_user_address,
    delete_user_address,
    get_user_address,
    list_user_addresses,
    set_default_address,
    update_user_address,
)

router = APIRouter(
    prefix="/addresses",
    tags=["Addresses"],
)


@router.get(
    "",
    response_model=list[AddressResponse],
    status_code=status.HTTP_200_OK,
)
async def get_addresses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_user_addresses(
        db=db,
        user=current_user,
    )


@router.post(
    "",
    response_model=AddressResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_address(
    data: AddressCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_user_address(
        db=db,
        user=current_user,
        data=data,
    )


@router.get(
    "/{address_id}",
    response_model=AddressResponse,
)
async def get_address(
    address_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_user_address(
        db=db,
        address_id=address_id,
        user=current_user,
    )


@router.patch(
    "/{address_id}",
    response_model=AddressResponse,
)
async def update_address(
    address_id: int,
    data: AddressUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_user_address(
        db=db,
        address_id=address_id,
        user=current_user,
        data=data,
    )


@router.patch(
    "/{address_id}/default",
    response_model=AddressResponse,
)
async def make_address_default(
    address_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await set_default_address(
        db=db,
        address_id=address_id,
        user=current_user,
    )


@router.delete(
    "/{address_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_address(
    address_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await delete_user_address(
        db=db,
        address_id=address_id,
        user=current_user,
    )

    return None
