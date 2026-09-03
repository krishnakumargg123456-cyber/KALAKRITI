from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product
from app.models.product_image import ProductImage
from app.repositories.product.image_repository import ProductImageRepository
from app.schemas.product.image import (
    ProductImageCreate,
    ProductImageUpdate,
)


class ProductImageService:

    def __init__(self) -> None:
        self.repository = ProductImageRepository()

    async def _validate_product(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> Product:

        result = await db.execute(
            select(Product).where(
                Product.id == product_id
            )
        )

        product = result.scalar_one_or_none()

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        return product

    async def list_images(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> list[ProductImage]:

        await self._validate_product(
            db,
            product_id,
        )

        return await self.repository.list_by_product(
            db,
            product_id,
        )

    async def get_image(
        self,
        db: AsyncSession,
        image_id: UUID,
    ) -> ProductImage:

        image = await self.repository.get_by_id(
            db,
            image_id,
        )

        if not image:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product image not found",
            )

        return image

    async def _set_primary(
        self,
        db: AsyncSession,
        product_id: UUID,
        image_id: UUID,
    ) -> None:

        await db.execute(
            update(ProductImage)
            .where(
                ProductImage.product_id == product_id,
                ProductImage.id != image_id,
            )
            .values(is_primary=False)
        )

    async def create_image(
        self,
        db: AsyncSession,
        product_id: UUID,
        data: ProductImageCreate,
    ) -> ProductImage:

        await self._validate_product(
            db,
            product_id,
        )

        image = ProductImage(
            product_id=product_id,
            image_url=data.image_url,
            alt_text=data.alt_text,
            sort_order=data.sort_order,
            is_primary=data.is_primary,
        )

        if data.is_primary:
            await db.execute(
                update(ProductImage)
                .where(
                    ProductImage.product_id == product_id
                )
                .values(is_primary=False)
            )

        return await self.repository.create(
            db,
            image,
        )

    async def update_image(
        self,
        db: AsyncSession,
        image_id: UUID,
        data: ProductImageUpdate,
    ) -> ProductImage:

        image = await self.get_image(
            db,
            image_id,
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if update_data.get("is_primary") is True:
            await self._set_primary(
                db,
                image.product_id,
                image.id,
            )

        for field, value in update_data.items():
            setattr(
                image,
                field,
                value,
            )

        return await self.repository.update(
            db,
            image,
        )

    async def delete_image(
        self,
        db: AsyncSession,
        image_id: UUID,
    ) -> None:

        image = await self.get_image(
            db,
            image_id,
        )

        await self.repository.delete(
            db,
            image,
        )
