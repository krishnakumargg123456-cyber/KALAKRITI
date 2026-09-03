from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.search.repository import SearchRepository


class SearchService:

    def __init__(self) -> None:
        self.repository = SearchRepository()

    async def search_products(
        self,
        db: AsyncSession,
        query: str,
        *,
        skip: int = 0,
        limit: int = 20,
    ):
        return await self.repository.search_products(
            db,
            query,
            skip=skip,
            limit=limit,
        )
