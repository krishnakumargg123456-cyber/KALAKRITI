from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class NotificationCreate(BaseModel):
    user_id: str
    title: str = Field(..., min_length=1, max_length=255)
    message: str = Field(..., min_length=1)
    type: str = Field(default="general", max_length=50)


class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime
    updated_at: datetime


class NotificationListResponse(BaseModel):
    items: list[NotificationResponse]
    total: int
    unread_count: int
