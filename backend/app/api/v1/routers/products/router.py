from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import (
    User,
    get_current_user,
    require_product_owner,
)
from app.schemas.product.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)
from app.services.product.service import ProductService


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)

service = ProductService()


@router.get(
    "",
    response_model=list[ProductResponse],
)
async def list_products(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    category_id: UUID | None = None,
    artisan_id: UUID | None = None,
    min_price: float | None = Query(default=None, ge=0),
    max_price: float | None = Query(default=None, ge=0),
    is_featured: bool | None = None,
    search: str | None = Query(default=None, min_length=1, max_length=120),
    db: AsyncSession = Depends(get_db),
):
    products, _ = await service.list_products(
        db,
        skip=skip,
        limit=limit,
        category_id=category_id,
        artisan_id=artisan_id,
        min_price=min_price,
        max_price=max_price,
        search=search,
        is_active=True,
        is_featured=is_featured,
        status_value="Approved",
    )

    return products


@router.get(
    "/me",
    response_model=list[ProductResponse],
)
async def list_my_products(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    product_status: str | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    products, _ = await service.list_my_products(
        db,
        current_user,
        skip=skip,
        limit=limit,
        status_value=product_status,
    )

    return products


@router.get(
    "/slug/{slug}",
    response_model=ProductResponse,
)
async def get_product_by_slug(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    return await service.get_product_by_slug(
        db,
        slug,
    )


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
async def get_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    product = await service.get_product(
        db,
        product_id,
    )

    # Non-approved products must not be publicly accessible.
    if product.status != "Approved" or not product.is_active:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_product(
    data: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.create_product(
        db,
        current_user,
        data,
    )


@router.post(
    "/{product_id}/submit",
    response_model=ProductResponse,
)
async def submit_product(
    product_id: UUID,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    return await service.submit_product(
        db,
        product_id,
        current_user,
    )

@router.patch(
    "/{product_id}",
    response_model=ProductResponse,
)
async def update_product(
    product_id: UUID,
    data: ProductUpdate,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_product(
        db,
        product_id,
        data,
    )


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product(
    product_id: UUID,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    await service.delete_product(
        db,
        product_id,
    )

