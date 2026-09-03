from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artisan import Artisan


class ArtisanRepository:

    async def list(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 20,
        is_active: bool | None = True,
        is_verified: bool | None = None,
    ) -> list[Artisan]:

        stmt = select(Artisan)

        if is_active is not None:
            stmt = stmt.where(
                Artisan.is_active.is_(is_active)
            )

        if is_verified is not None:
            stmt = stmt.where(
                Artisan.is_verified.is_(is_verified)
            )

        stmt = (
            stmt
            .order_by(Artisan.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        result = await db.execute(stmt)

        return list(result.scalars().all())

    async def count(
        self,
        db: AsyncSession,
        *,
        is_active: bool | None = True,
        is_verified: bool | None = None,
    ) -> int:

        stmt = select(func.count(Artisan.id))

        if is_active is not None:
            stmt = stmt.where(
                Artisan.is_active.is_(is_active)
            )

        if is_verified is not None:
            stmt = stmt.where(
                Artisan.is_verified.is_(is_verified)
            )

        result = await db.execute(stmt)

        return result.scalar_one()

    async def get_by_id(
        self,
        db: AsyncSession,
        artisan_id: UUID,
    ) -> Artisan | None:

        result = await db.execute(
            select(Artisan).where(
                Artisan.id == artisan_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_user_id(
        self,
        db: AsyncSession,
        user_id: UUID,
    ) -> Artisan | None:

        result = await db.execute(
            select(Artisan).where(
                Artisan.user_id == user_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_shop_name(
        self,
        db: AsyncSession,
        shop_name: str,
    ) -> Artisan | None:

        result = await db.execute(
            select(Artisan).where(
                Artisan.shop_name == shop_name
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        artisan: Artisan,
    ) -> Artisan:

        db.add(artisan)

        await db.flush()
        await db.refresh(artisan)

        return artisan

    async def update(
        self,
        db: AsyncSession,
        artisan: Artisan,
    ) -> Artisan:

        await db.flush()
        await db.refresh(artisan)

        return artisan

    async def delete(
        self,
        db: AsyncSession,
        artisan: Artisan,
    ) -> None:

        await db.delete(artisan)

        await db.flush()
