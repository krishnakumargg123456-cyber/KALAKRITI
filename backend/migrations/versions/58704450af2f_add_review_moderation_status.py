"""add review moderation status

Revision ID: 58704450af2f
Revises: ef52e2aa9251
Create Date: 2026-09-03 10:39:53.164391

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "58704450af2f"
down_revision: Union[str, Sequence[str], None] = "ef52e2aa9251"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "reviews",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE reviews SET status = 'published' WHERE status IS NULL"
    )

    op.alter_column(
        "reviews",
        "status",
        existing_type=sa.String(length=20),
        nullable=False,
        server_default="pending",
    )

    op.create_index(
        "ix_reviews_status",
        "reviews",
        ["status"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_reviews_status",
        table_name="reviews",
    )

    op.drop_column(
        "reviews",
        "status",
    )
