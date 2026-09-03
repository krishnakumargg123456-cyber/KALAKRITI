from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_product_owner
from app.models.user import User
from app.schemas.product.image import (
    ProductImageCreate,
    ProductImageResponse,
    ProductImageUpdate,
)
from app.services.product.image_service import ProductImageService


router = APIRouter(
    prefix="/products/{product_id}/images",
    tags=["Product Images"],
)

service = ProductImageService()


@router.get(
    "",
    response_model=list[ProductImageResponse],
)
async def list_product_images(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await service.list_images(
        db,
        product_id,
    )


@router.get(
    "/{image_id}",
    response_model=ProductImageResponse,
)
async def get_product_image(
    product_id: UUID,
    image_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    image = await service.get_image(
        db,
        image_id,
    )

    if image.product_id != product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product image not found",
        )

    return image


@router.post(
    "",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_product_image(
    product_id: UUID,
    data: ProductImageCreate,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    return await service.create_image(
        db,
        product_id,
        data,
    )


@router.patch(
    "/{image_id}",
    response_model=ProductImageResponse,
)
async def update_product_image(
    product_id: UUID,
    image_id: UUID,
    data: ProductImageUpdate,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    image = await service.get_image(
        db,
        image_id,
    )

    if image.product_id != product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product image not found",
        )

    return await service.update_image(
        db,
        image_id,
        data,
    )


@router.delete(
    "/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product_image(
    product_id: UUID,
    image_id: UUID,
    current_user: User = Depends(require_product_owner),
    db: AsyncSession = Depends(get_db),
):
    image = await service.get_image(
        db,
        image_id,
    )

    if image.product_id != product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product image not found",
        )

    await service.delete_image(
        db,
        image_id,
    )
