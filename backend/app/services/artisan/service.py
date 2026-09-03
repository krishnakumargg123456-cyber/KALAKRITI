from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artisan import Artisan
from app.models.user import User
from app.repositories.artisan.repository import ArtisanRepository
from app.schemas.artisan.artisan import (
    ArtisanCreate,
    ArtisanMeCreate,
    ArtisanMeUpdate,
    ArtisanUpdate,
)


class ArtisanService:

    def __init__(self) -> None:
        self.repository = ArtisanRepository()

    async def list_artisans(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 20,
        is_active: bool | None = True,
        is_verified: bool | None = None,
    ) -> tuple[list[Artisan], int]:

        artisans = await self.repository.list(
            db,
            skip=skip,
            limit=limit,
            is_active=is_active,
            is_verified=is_verified,
        )

        total = await self.repository.count(
            db,
            is_active=is_active,
            is_verified=is_verified,
        )

        return artisans, total

    async def get_artisan(
        self,
        db: AsyncSession,
        artisan_id: UUID,
    ) -> Artisan:

        artisan = await self.repository.get_by_id(
            db,
            artisan_id,
        )

        if not artisan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Artisan not found",
            )

        return artisan

    async def get_my_artisan(
        self,
        db: AsyncSession,
        current_user: User,
    ) -> Artisan:

        artisan = await self.repository.get_by_user_id(
            db,
            current_user.id,
        )

        if not artisan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Artisan profile not found",
            )

        return artisan

    async def create_my_artisan(
        self,
        db: AsyncSession,
        current_user: User,
        data: ArtisanMeCreate,
    ) -> Artisan:

        existing = await self.repository.get_by_user_id(
            db,
            current_user.id,
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="You are already registered as an artisan",
            )

        existing_shop = await self.repository.get_by_shop_name(
            db,
            data.shop_name,
        )

        if existing_shop:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Artisan shop name already exists",
            )

        if current_user.role == "admin":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Admin accounts cannot create artisan profiles",
            )

        artisan = Artisan(
            user_id=current_user.id,
            shop_name=data.shop_name,
            bio=data.bio,
            craft_specialization=data.craft_specialization,
            state=data.state,
            district=data.district,
            is_verified=False,
            is_active=True,
        )

        current_user.role = "artisan"

        return await self.repository.create(
            db,
            artisan,
        )

    async def update_my_artisan(
        self,
        db: AsyncSession,
        current_user: User,
        data: ArtisanMeUpdate,
    ) -> Artisan:

        artisan = await self.repository.get_by_user_id(
            db,
            current_user.id,
        )

        if not artisan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Artisan profile not found",
            )

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if "shop_name" in update_data:
            existing_shop = await self.repository.get_by_shop_name(
                db,
                update_data["shop_name"],
            )

            if (
                existing_shop
                and existing_shop.id != artisan.id
            ):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Artisan shop name already exists",
                )

        for field, value in update_data.items():
            setattr(
                artisan,
                field,
                value,
            )

        return await self.repository.update(
            db,
            artisan,
        )

    async def create_artisan(
        self,
        db: AsyncSession,
        data: ArtisanCreate,
    ) -> Artisan:

        existing_user = await self.repository.get_by_user_id(
            db,
            data.user_id,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User is already registered as an artisan",
            )

        existing_shop = await self.repository.get_by_shop_name(
            db,
            data.shop_name,
        )

        if existing_shop:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Artisan shop name already exists",
            )

        artisan = Artisan(
            user_id=data.user_id,
            shop_name=data.shop_name,
            bio=data.bio,
            craft_specialization=data.craft_specialization,
            state=data.state,
            district=data.district,
            is_verified=False,
            is_active=True,
        )

        return await self.repository.create(
            db,
            artisan,
        )

    async def update_artisan(
        self,
        db: AsyncSession,
        artisan_id: UUID,
        data: ArtisanUpdate,
    ) -> Artisan:

        artisan = await self.get_artisan(
            db,
            artisan_id,
        )

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if "shop_name" in update_data:
            existing_shop = await self.repository.get_by_shop_name(
                db,
                update_data["shop_name"],
            )

            if (
                existing_shop
                and existing_shop.id != artisan.id
            ):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Artisan shop name already exists",
                )

        for field, value in update_data.items():
            setattr(
                artisan,
                field,
                value,
            )

        return await self.repository.update(
            db,
            artisan,
        )

    async def delete_artisan(
        self,
        db: AsyncSession,
        artisan_id: UUID,
    ) -> None:

        artisan = await self.get_artisan(
            db,
            artisan_id,
        )

        await self.repository.delete(
            db,
            artisan,
        )
