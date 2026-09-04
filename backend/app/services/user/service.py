from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artisan import Artisan
from app.models.order import Order
from app.models.payout import Payout
from app.models.user import User
from app.repositories.user import user_repository
from app.schemas.user import UserUpdate


async def get_user(
    db: AsyncSession,
    user_id: UUID,
) -> User:

    user = await user_repository.get_by_id(
        db,
        user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


async def update_user(
    db: AsyncSession,
    *,
    user: User,
    data: UserUpdate,
) -> User:

    update_data = data.model_dump(
        exclude_unset=True,
    )

    if "email" in update_data:
        existing = await user_repository.get_by_email(
            db,
            update_data["email"],
        )

        if existing is not None and existing.id != user.id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered",
            )

    for field, value in update_data.items():
        setattr(user, field, value)

    try:
        return await user_repository.update(
            db,
            user,
        )
    except IntegrityError:
        await db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )


async def delete_user(
    db: AsyncSession,
    *,
    user: User,
) -> bool:
    """Delete an account when safe; otherwise deactivate it.

    Returns True when permanently deleted and False when deactivated
    because financial/order history must be preserved.
    """

    order_exists = (
        await db.execute(
            select(Order.id)
            .where(Order.user_id == user.id)
            .limit(1)
        )
    ).scalar_one_or_none()

    payout_exists = False

    if user.role == "artisan":
        artisan_id = (
            await db.execute(
                select(Artisan.id)
                .where(Artisan.user_id == user.id)
                .limit(1)
            )
        ).scalar_one_or_none()

        if artisan_id is not None:
            payout_exists = (
                await db.execute(
                    select(Payout.id)
                    .where(Payout.artisan_id == artisan_id)
                    .limit(1)
                )
            ).scalar_one_or_none() is not None

    if order_exists is not None or payout_exists:
        user.is_active = False

        if user.role == "artisan":
            artisan = (
                await db.execute(
                    select(Artisan)
                    .where(Artisan.user_id == user.id)
                )
            ).scalar_one_or_none()

            if artisan is not None:
                artisan.is_active = False

        await db.flush()
        return False

    try:
        await user_repository.delete(db, user)
        return True
    except IntegrityError:
        await db.rollback()

        user.is_active = False

        if user.role == "artisan":
            artisan = (
                await db.execute(
                    select(Artisan)
                    .where(Artisan.user_id == user.id)
                )
            ).scalar_one_or_none()

            if artisan is not None:
                artisan.is_active = False

        await db.flush()
        return False
