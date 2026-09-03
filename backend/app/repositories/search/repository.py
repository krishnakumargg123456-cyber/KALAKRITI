from sqlalchemy import or_, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product


class SearchRepository:

    async def search_products(
        self,
        db: AsyncSession,
        query: str,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Product], int]:

        pattern = f"%{query}%"

        filters = or_(
            Product.name.ilike(pattern),
            Product.slug.ilike(pattern),
            Product.description.ilike(pattern),
            Product.material.ilike(pattern),
            Product.craft_region.ilike(pattern),
            Product.sku.ilike(pattern),
        )

        result = await db.execute(
            select(Product)
            .where(
                Product.is_active.is_(True),
                filters,
            )
            .order_by(Product.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        products = list(result.scalars().all())

        count_result = await db.execute(
            select(func.count(Product.id))
            .where(
                Product.is_active.is_(True),
                filters,
            )
        )

        total = int(count_result.scalar_one())

        return products, total
