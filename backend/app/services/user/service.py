from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

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
