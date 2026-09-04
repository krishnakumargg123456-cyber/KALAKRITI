from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security.jwt import create_access_token
from app.dependencies import (
    get_current_user,
    get_db,
    require_admin,
    require_artisan,
    require_customer,
)
from app.models.user import User
from app.schemas.auth.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth.service import (
    authenticate_user,
    register_user,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.get("/status")
async def auth_status():
    return {
        "status": "ok",
        "module": "authentication",
    }


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        user = await register_user(
            db=db,
            email=data.email,
            full_name=data.full_name,
            password=data.password,
            role=data.role,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    return UserResponse.model_validate(user)


@router.post(
    "/login",
    response_model=TokenResponse,
)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    user = await authenticate_user(
        db=db,
        email=data.email,
        password=data.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(
        subject=user.email,
        role=user.role,
    )

    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
async def me(
    current_user: User = Depends(get_current_user),
):
    return UserResponse.model_validate(current_user)


@router.get("/customer-test")
async def customer_test(
    current_user: User = Depends(require_customer),
):
    return {
        "status": "ok",
        "message": "Customer authorization successful",
        "user": current_user.email,
        "role": current_user.role,
    }


@router.get("/artisan-test")
async def artisan_test(
    current_user: User = Depends(require_artisan),
):
    return {
        "status": "ok",
        "message": "Artisan authorization successful",
        "user": current_user.email,
        "role": current_user.role,
    }


@router.get("/admin-test")
async def admin_test(
    current_user: User = Depends(require_admin),
):
    return {
        "status": "ok",
        "message": "Admin authorization successful",
        "user": current_user.email,
        "role": current_user.role,
    }
