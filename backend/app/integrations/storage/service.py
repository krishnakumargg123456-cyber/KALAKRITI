from __future__ import annotations

import os
import uuid
from pathlib import Path

from fastapi import UploadFile


class StorageService:
    """
    Local filesystem storage abstraction.

    Designed so Cloudinary/S3 can be plugged in later without
    changing the API/service layer.
    """

    def __init__(self) -> None:
        self.base_dir = Path(
            os.getenv("STORAGE_LOCAL_DIR", "storage")
        )
        self.base_dir.mkdir(parents=True, exist_ok=True)

    async def upload(
        self,
        file: UploadFile,
        folder: str = "uploads",
    ) -> dict[str, str]:
        if not file.filename:
            raise ValueError("File name is required")

        extension = Path(file.filename).suffix.lower()
        filename = f"{uuid.uuid4().hex}{extension}"

        target_dir = self.base_dir / folder
        target_dir.mkdir(parents=True, exist_ok=True)

        target_path = target_dir / filename

        content = await file.read()

        if not content:
            raise ValueError("Uploaded file is empty")

        target_path.write_bytes(content)

        return {
            "filename": filename,
            "path": str(target_path),
            "url": f"/storage/{folder}/{filename}",
        }

    def delete(
        self,
        path: str,
    ) -> bool:
        target = Path(path)

        if not target.exists():
            return False

        if target.is_file():
            target.unlink()
            return True

        return False
