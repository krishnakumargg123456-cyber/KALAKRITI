"""add moderation items

Revision ID: f4c8a91d27be
Revises: da1ea1b81cc4
Create Date: 2026-09-03 00:15:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "f4c8a91d27be"
down_revision: Union[str, Sequence[str], None] = "da1ea1b81cc4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "moderation_items",
        sa.Column(
            "id",
            sa.Integer(),
            autoincrement=True,
            nullable=False,
        ),
        sa.Column(
            "content_type",
            sa.String(length=30),
            nullable=False,
        ),
        sa.Column(
            "content_id",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "submitted_by",
            sa.UUID(),
            nullable=True,
        ),
        sa.Column(
            "title",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "description",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "image_url",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
        ),
        sa.Column(
            "priority",
            sa.String(length=20),
            nullable=False,
        ),
        sa.Column(
            "reviewed_by",
            sa.UUID(),
            nullable=True,
        ),
        sa.Column(
            "reviewed_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
        sa.Column(
            "rejection_reason",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_moderation_items_content_type"),
        "moderation_items",
        ["content_type"],
        unique=False,
    )

    op.create_index(
        op.f("ix_moderation_items_content_id"),
        "moderation_items",
        ["content_id"],
        unique=False,
    )

    op.create_index(
        op.f("ix_moderation_items_submitted_by"),
        "moderation_items",
        ["submitted_by"],
        unique=False,
    )

    op.create_index(
        op.f("ix_moderation_items_status"),
        "moderation_items",
        ["status"],
        unique=False,
    )

    op.create_index(
        op.f("ix_moderation_items_priority"),
        "moderation_items",
        ["priority"],
        unique=False,
    )

    op.create_index(
        op.f("ix_moderation_items_reviewed_by"),
        "moderation_items",
        ["reviewed_by"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_moderation_items_reviewed_by"),
        table_name="moderation_items",
    )

    op.drop_index(
        op.f("ix_moderation_items_priority"),
        table_name="moderation_items",
    )

    op.drop_index(
        op.f("ix_moderation_items_status"),
        table_name="moderation_items",
    )

    op.drop_index(
        op.f("ix_moderation_items_submitted_by"),
        table_name="moderation_items",
    )

    op.drop_index(
        op.f("ix_moderation_items_content_id"),
        table_name="moderation_items",
    )

    op.drop_index(
        op.f("ix_moderation_items_content_type"),
        table_name="moderation_items",
    )

    op.drop_table("moderation_items")
