"""add product lifecycle status

Revision ID: 06c423490385
Revises: 7d3b31d4642b
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "06c423490385"
down_revision: Union[str, Sequence[str], None] = "7d3b31d4642b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "products",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="Approved",
        ),
    )

    op.create_index(
        op.f("ix_products_status"),
        "products",
        ["status"],
        unique=False,
    )

    # Existing products were already live before the lifecycle workflow.
    op.execute(
        "UPDATE products SET status = 'Approved' "
        "WHERE status IS NULL OR status = ''"
    )

    op.alter_column(
        "products",
        "status",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_products_status"),
        table_name="products",
    )

    op.drop_column(
        "products",
        "status",
    )
