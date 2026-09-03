from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product_image import ProductImage


class ProductImageRepository:

    async def list_by_product(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> list[ProductImage]:

        result = await db.execute(
            select(ProductImage)
            .where(ProductImage.product_id == product_id)
            .order_by(
                ProductImage.sort_order.asc(),
                ProductImage.id.asc(),
            )
        )

        return list(result.scalars().all())

    async def get_by_id(
        self,
        db: AsyncSession,
        image_id: UUID,
    ) -> ProductImage | None:

        result = await db.execute(
            select(ProductImage).where(
                ProductImage.id == image_id
            )
        )

        return result.scalar_one_or_none()

    async def get_primary(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> ProductImage | None:

        result = await db.execute(
            select(ProductImage).where(
                ProductImage.product_id == product_id,
                ProductImage.is_primary.is_(True),
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        image: ProductImage,
    ) -> ProductImage:

        db.add(image)
        await db.flush()
        await db.refresh(image)

        return image

    async def update(
        self,
        db: AsyncSession,
        image: ProductImage,
    ) -> ProductImage:

        await db.flush()
        await db.refresh(image)

        return image

    async def delete(
        self,
        db: AsyncSession,
        image: ProductImage,
    ) -> None:

        await db.delete(image)
        await db.flush()
