from uuid import UUID, uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security.password import hash_password, verify_password
from app.models.user import User


async def get_user_by_email(
    db: AsyncSession,
    email: str,
) -> User | None:
    result = await db.execute(
        select(User).where(User.email == email)
    )
    return result.scalar_one_or_none()


async def register_user(
    db: AsyncSession,
    email: str,
    full_name: str,
    password: str,
) -> User:
    existing_user = await get_user_by_email(db, email)

    if existing_user:
        raise ValueError("Email already registered")

    user = User(
        id=uuid4(),
        email=email,
        full_name=full_name,
        password_hash=hash_password(password),
        is_active=True,
        is_verified=False,
        role="customer",
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


async def authenticate_user(
    db: AsyncSession,
    email: str,
    password: str,
) -> User | None:
    user = await get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    if not user.is_active:
        return None

    return user