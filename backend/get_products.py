import asyncio
from sqlalchemy import select
from app.core.database.session import AsyncSessionLocal
from app.models.product import Product

async def main():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Product))
        products = result.scalars().all()

        for p in products:
            print("ID:", p.id)
            print("NAME:", getattr(p, "name", None))
            print("PRICE:", getattr(p, "price", None))
            print("ACTIVE:", getattr(p, "is_active", None))
            print("-" * 50)

asyncio.run(main())
