from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.product import Product
from app.models.user import User
from app.repositories.product.repository import ProductRepository
from app.schemas.product.product import ProductResponse, ProductUpdate


router = APIRouter(
    prefix="/products",
    tags=["Admin Products"],
)

repository = ProductRepository()


@router.get(
    "",
    response_model=list[ProductResponse],
)
async def list_admin_products(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    product_status: str | None = Query(default=None, alias="status"),
    artisan_id: UUID | None = None,
    category_id: UUID | None = None,
    active: bool | None = None,
    featured: bool | None = None,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[ProductResponse]:

    products = await repository.list(
        db,
        skip=skip,
        limit=limit,
        artisan_id=artisan_id,
        category_id=category_id,
        is_active=active,
        is_featured=featured,
        status=product_status,
    )

    return [
        ProductResponse.model_validate(product)
        for product in products
    ]


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
async def get_admin_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}",
    response_model=ProductResponse,
)
async def update_admin_product(
    product_id: UUID,
    data: ProductUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(product, field, value)

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/approve",
    response_model=ProductResponse,
)
async def approve_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    product.status = "Approved"
    product.is_active = True

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/reject",
    response_model=ProductResponse,
)
async def reject_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    product.status = "Rejected"
    product.is_active = False
    product.is_featured = False

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/activate",
    response_model=ProductResponse,
)
async def activate_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if product.status != "Approved":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only approved products can be activated",
        )

    product.is_active = True

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/deactivate",
    response_model=ProductResponse,
)
async def deactivate_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    product.is_active = False

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/feature",
    response_model=ProductResponse,
)
async def feature_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if product.status != "Approved" or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only active approved products can be featured",
        )

    product.is_featured = True

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.patch(
    "/{product_id}/unfeature",
    response_model=ProductResponse,
)
async def unfeature_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> ProductResponse:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    product.is_featured = False

    await repository.update(
        db,
        product,
    )

    return ProductResponse.model_validate(product)


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_admin_product(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> None:

    product = await repository.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    await repository.delete(
        db,
        product,
    )
