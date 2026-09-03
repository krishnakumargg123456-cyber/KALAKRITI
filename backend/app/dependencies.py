from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.core.security.jwt import decode_access_token
from app.models.artisan import Artisan
from app.models.product import Product
from app.models.user import User
from app.services.auth.service import get_user_by_email


security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = payload.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await get_user_by_email(db, email)

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def require_role(required_role: str):

    async def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{required_role.capitalize()} access required",
            )

        return current_user

    return role_checker


require_customer = require_role("customer")
require_artisan = require_role("artisan")
require_admin = require_role("admin")


async def require_artisan_or_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role not in {"artisan", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Artisan or admin access required",
        )

    return current_user


async def require_artisan_owns_artisan(
    artisan_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    if current_user.role == "admin":
        return current_user

    if current_user.role != "artisan":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Artisan or admin access required",
        )

    result = await db.execute(
        select(Artisan.id).where(
            Artisan.id == artisan_id,
            Artisan.user_id == current_user.id,
        )
    )

    owned_artisan_id = result.scalar_one_or_none()

    if owned_artisan_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to use this artisan profile",
        )

    return current_user


async def require_product_owner(
    product_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:

    if current_user.role == "admin":
        return current_user

    if current_user.role != "artisan":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Artisan or admin access required",
        )

    result = await db.execute(
        select(Product.artisan_id)
        .join(
            Artisan,
            Artisan.id == Product.artisan_id,
        )
        .where(
            Product.id == product_id,
            Artisan.user_id == current_user.id,
        )
    )

    artisan_id = result.scalar_one_or_none()

    if artisan_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to manage this product",
        )

    return current_user


__all__ = [
    "AsyncSession",
    "get_db",
    "get_current_user",
    "require_customer",
    "require_artisan",
    "require_admin",
    "require_artisan_or_admin",
    "require_artisan_owns_artisan",
    "require_product_create_access",
    "require_product_owner",
]


async def require_product_create_access(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    if current_user.role == "admin":
        return current_user

    if current_user.role != "artisan":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Artisan or admin access required",
        )

    result = await db.execute(
        select(Artisan).where(
            Artisan.user_id == current_user.id,
            Artisan.is_active.is_(True),
        )
    )

    artisan = result.scalar_one_or_none()

    if artisan is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active artisan profile required",
        )

    return current_user

