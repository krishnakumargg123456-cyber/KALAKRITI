from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.schemas.search.search import SearchResponse
from app.services.search.service import SearchService


router = APIRouter(
    prefix="/search",
    tags=["Search"],
)

service = SearchService()


@router.get(
    "/products",
    response_model=SearchResponse,
)
async def search_products(
    q: str = Query(
        ...,
        min_length=2,
        max_length=100,
    ),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    products, total = await service.search_products(
        db,
        q.strip(),
        skip=skip,
        limit=limit,
    )

    return SearchResponse(
        items=products,
        total=total,
        skip=skip,
        limit=limit,
        query=q.strip(),
    )
