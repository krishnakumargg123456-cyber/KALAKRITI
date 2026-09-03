"""add stories

Revision ID: 7d3b31d4642b
Revises: d91a02a0fc5d
Create Date: 2026-09-03 13:27:31.452609

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "7d3b31d4642b"
down_revision: Union[str, Sequence[str], None] = "d91a02a0fc5d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "stories",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("artisan_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("slug", sa.String(length=220), nullable=False),
        sa.Column("excerpt", sa.String(length=500), nullable=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("cover_image_url", sa.String(length=1000), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
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
        sa.ForeignKeyConstraint(
            ["artisan_id"],
            ["artisans.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_stories_artisan_id"),
        "stories",
        ["artisan_id"],
        unique=False,
    )

    op.create_index(
        "ix_stories_artisan_status",
        "stories",
        ["artisan_id", "status"],
        unique=False,
    )

    op.create_index(
        op.f("ix_stories_slug"),
        "stories",
        ["slug"],
        unique=True,
    )

    op.create_index(
        op.f("ix_stories_status"),
        "stories",
        ["status"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_stories_status"), table_name="stories")
    op.drop_index(op.f("ix_stories_slug"), table_name="stories")
    op.drop_index("ix_stories_artisan_status", table_name="stories")
    op.drop_index(op.f("ix_stories_artisan_id"), table_name="stories")
    op.drop_table("stories")
