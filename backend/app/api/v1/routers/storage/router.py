from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.dependencies import User, require_artisan_or_admin
from app.integrations.storage import StorageService


router = APIRouter(
    prefix="/storage",
    tags=["Storage"],
)

storage_service = StorageService()

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

MAX_IMAGE_SIZE = 5 * 1024 * 1024


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    _: User = Depends(require_artisan_or_admin),
):
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File name is required",
        )

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPG, PNG and WEBP images are allowed",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image extension",
        )

    content = await file.read()

    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty",
        )

    if len(content) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image size must be 5 MB or less",
        )

    await file.seek(0)

    try:
        return await storage_service.upload(
            file=file,
            folder="products",
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.delete("/file")
async def delete_file(
    path: str,
    _: User = Depends(require_artisan_or_admin),
):
    deleted = storage_service.delete(path)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    return {
        "message": "File deleted successfully",
    }
