import asyncio
from sqlalchemy import text
from app.core.database.session import engine

async def main():
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT current_database(), current_user"))
        print(result.fetchone())

    await engine.dispose()

asyncio.run(main())
