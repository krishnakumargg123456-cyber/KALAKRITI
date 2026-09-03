from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.address import Address
from app.models.user import User
from app.repositories.address import address_repository
from app.schemas.address import AddressCreate, AddressUpdate


async def list_user_addresses(
    db: AsyncSession,
    *,
    user: User,
) -> list[Address]:

    return await address_repository.list_by_user(
        db,
        user_id=user.id,
    )


async def get_user_address(
    db: AsyncSession,
    *,
    address_id: int,
    user: User,
) -> Address:

    address = await address_repository.get_by_id_and_user(
        db,
        address_id=address_id,
        user_id=user.id,
    )

    if address is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address not found",
        )

    return address


async def clear_default_address(
    db: AsyncSession,
    *,
    user_id: UUID,
    exclude_address_id: int | None = None,
) -> None:

    current_default = await address_repository.get_default(
        db,
        user_id=user_id,
    )

    if (
        current_default is not None
        and current_default.id != exclude_address_id
    ):
        current_default.is_default = False

        await address_repository.update(
            db,
            current_default,
        )


async def create_user_address(
    db: AsyncSession,
    *,
    user: User,
    data: AddressCreate,
) -> Address:

    if data.is_default:
        await clear_default_address(
            db,
            user_id=user.id,
        )
    else:
        existing_addresses = await address_repository.list_by_user(
            db,
            user_id=user.id,
        )

        if not existing_addresses:
            data = data.model_copy(
                update={"is_default": True}
            )

    address = Address(
        user_id=user.id,
        full_name=data.full_name,
        phone=data.phone,
        address_line1=data.address_line1,
        address_line2=data.address_line2,
        landmark=data.landmark,
        city=data.city,
        district=data.district,
        state=data.state,
        postal_code=data.postal_code,
        country=data.country,
        is_default=data.is_default,
    )

    return await address_repository.create(
        db,
        address,
    )


async def update_user_address(
    db: AsyncSession,
    *,
    address_id: int,
    user: User,
    data: AddressUpdate,
) -> Address:

    address = await get_user_address(
        db,
        address_id=address_id,
        user=user,
    )

    update_data = data.model_dump(
        exclude_unset=True,
    )

    if update_data.get("is_default") is True:
        await clear_default_address(
            db,
            user_id=user.id,
            exclude_address_id=address.id,
        )

    for field, value in update_data.items():
        setattr(address, field, value)

    return await address_repository.update(
        db,
        address,
    )


async def set_default_address(
    db: AsyncSession,
    *,
    address_id: int,
    user: User,
) -> Address:

    address = await get_user_address(
        db,
        address_id=address_id,
        user=user,
    )

    await clear_default_address(
        db,
        user_id=user.id,
        exclude_address_id=address.id,
    )

    address.is_default = True

    return await address_repository.update(
        db,
        address,
    )


async def delete_user_address(
    db: AsyncSession,
    *,
    address_id: int,
    user: User,
) -> None:

    address = await get_user_address(
        db,
        address_id=address_id,
        user=user,
    )

    was_default = address.is_default

    await address_repository.delete(
        db,
        address,
    )

    if was_default:
        remaining = await address_repository.list_by_user(
            db,
            user_id=user.id,
        )

        if remaining:
            remaining[0].is_default = True

            await address_repository.update(
                db,
                remaining[0],
            )
