"""add payouts

Revision ID: ef52e2aa9251
Revises: f4c8a91d27be
Create Date: 2026-09-03 10:30:03.977407

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "ef52e2aa9251"
down_revision: Union[str, Sequence[str], None] = "f4c8a91d27be"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create payouts table."""
    op.create_table(
        "payouts",
        sa.Column(
            "id",
            sa.Integer(),
            autoincrement=True,
            nullable=False,
        ),
        sa.Column(
            "artisan_id",
            sa.UUID(),
            nullable=False,
        ),
        sa.Column(
            "order_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "gross_amount",
            sa.Numeric(precision=12, scale=2),
            nullable=False,
        ),
        sa.Column(
            "commission_amount",
            sa.Numeric(precision=12, scale=2),
            nullable=False,
            server_default=sa.text("0"),
        ),
        sa.Column(
            "net_amount",
            sa.Numeric(precision=12, scale=2),
            nullable=False,
        ),
        sa.Column(
            "status",
            sa.Enum(
                "PENDING",
                "PROCESSING",
                "PAID",
                "FAILED",
                "CANCELLED",
                name="payoutstatus",
            ),
            nullable=False,
        ),
        sa.Column(
            "payout_reference",
            sa.String(length=255),
            nullable=True,
        ),
        sa.Column(
            "failure_reason",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "payment_gateway",
            sa.String(length=50),
            nullable=True,
        ),
        sa.Column(
            "transaction_id",
            sa.String(length=255),
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
        sa.ForeignKeyConstraint(
            ["artisan_id"],
            ["artisans.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["order_id"],
            ["orders.id"],
            ondelete="RESTRICT",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_payouts_artisan_id",
        "payouts",
        ["artisan_id"],
        unique=False,
    )
    op.create_index(
        "ix_payouts_order_id",
        "payouts",
        ["order_id"],
        unique=False,
    )
    op.create_index(
        "ix_payouts_payout_reference",
        "payouts",
        ["payout_reference"],
        unique=True,
    )
    op.create_index(
        "ix_payouts_status",
        "payouts",
        ["status"],
        unique=False,
    )
    op.create_index(
        "ix_payouts_transaction_id",
        "payouts",
        ["transaction_id"],
        unique=True,
    )


def downgrade() -> None:
    """Drop payouts table."""
    op.drop_index(
        "ix_payouts_transaction_id",
        table_name="payouts",
    )
    op.drop_index(
        "ix_payouts_status",
        table_name="payouts",
    )
    op.drop_index(
        "ix_payouts_payout_reference",
        table_name="payouts",
    )
    op.drop_index(
        "ix_payouts_order_id",
        table_name="payouts",
    )
    op.drop_index(
        "ix_payouts_artisan_id",
        table_name="payouts",
    )
    op.drop_table("payouts")
