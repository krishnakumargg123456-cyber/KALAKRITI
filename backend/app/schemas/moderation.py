from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ModerationContentType(str, Enum):
    PRODUCT = "Product"
    REVIEW = "Review"
    ARTISAN = "Artisan"
    STORY = "Story"


class ModerationStatus(str, Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class ModerationPriority(str, Enum):
    NORMAL = "Normal"
    HIGH = "High"


class ModerationCreate(BaseModel):
    content_type: ModerationContentType
    content_id: str = Field(min_length=1, max_length=100)
    submitted_by: UUID | None = None
    title: str = Field(min_length=1, max_length=255)
    description: str | None = None
    image_url: str | None = None
    priority: ModerationPriority = ModerationPriority.NORMAL


class ModerationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    content_type: ModerationContentType
    content_id: str
    submitted_by: UUID | None
    title: str
    description: str | None
    image_url: str | None
    status: ModerationStatus
    priority: ModerationPriority
    reviewed_by: UUID | None
    reviewed_at: datetime | None
    rejection_reason: str | None
    created_at: datetime
    updated_at: datetime


class ModerationReject(BaseModel):
    reason: str = Field(min_length=1, max_length=1000)
