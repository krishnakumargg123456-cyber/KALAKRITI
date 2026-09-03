from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.address import Address


class AddressRepository:

    async def list_by_user(
        self,
        db: AsyncSession,
        *,
        user_id: UUID,
    ) -> list[Address]:

        result = await db.execute(
            select(Address)
            .where(Address.user_id == user_id)
            .order_by(
                Address.is_default.desc(),
                Address.created_at.desc(),
            )
        )

        return list(result.scalars().all())

    async def get_by_id(
        self,
        db: AsyncSession,
        address_id: int,
    ) -> Address | None:

        result = await db.execute(
            select(Address).where(
                Address.id == address_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_id_and_user(
        self,
        db: AsyncSession,
        *,
        address_id: int,
        user_id: UUID,
    ) -> Address | None:

        result = await db.execute(
            select(Address).where(
                Address.id == address_id,
                Address.user_id == user_id,
            )
        )

        return result.scalar_one_or_none()

    async def get_default(
        self,
        db: AsyncSession,
        *,
        user_id: UUID,
    ) -> Address | None:

        result = await db.execute(
            select(Address).where(
                Address.user_id == user_id,
                Address.is_default.is_(True),
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        address: Address,
    ) -> Address:

        db.add(address)

        await db.flush()
        await db.refresh(address)

        return address

    async def update(
        self,
        db: AsyncSession,
        address: Address,
    ) -> Address:

        await db.flush()
        await db.refresh(address)

        return address

    async def delete(
        self,
        db: AsyncSession,
        address: Address,
    ) -> None:

        await db.delete(address)
        await db.flush()


address_repository = AddressRepository()
