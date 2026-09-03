"""add admin settings

Revision ID: d91a02a0fc5d
Revises: 58704450af2f
Create Date: 2026-09-03 11:41:31.893593

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d91a02a0fc5d"
down_revision: Union[str, Sequence[str], None] = "58704450af2f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "admin_settings",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("marketplace_name", sa.String(length=150), nullable=False),
        sa.Column("support_email", sa.String(length=255), nullable=False),
        sa.Column("support_phone", sa.String(length=30), nullable=True),
        sa.Column("currency", sa.String(length=10), nullable=False),
        sa.Column("language", sa.String(length=50), nullable=False),
        sa.Column("timezone", sa.String(length=100), nullable=False),
        sa.Column("order_confirmation", sa.Boolean(), nullable=False),
        sa.Column("shipping_updates", sa.Boolean(), nullable=False),
        sa.Column("customer_reviews", sa.Boolean(), nullable=False),
        sa.Column("artisan_notifications", sa.Boolean(), nullable=False),
        sa.Column("email_notifications", sa.Boolean(), nullable=False),
        sa.Column("sms_notifications", sa.Boolean(), nullable=False),
        sa.Column("tax_enabled", sa.Boolean(), nullable=False),
        sa.Column("tax_rate", sa.Numeric(precision=5, scale=2), nullable=False),
        sa.Column(
            "commission_rate",
            sa.Numeric(precision=5, scale=2),
            nullable=False,
        ),
        sa.Column("cod_enabled", sa.Boolean(), nullable=False),
        sa.Column("razorpay_enabled", sa.Boolean(), nullable=False),
        sa.Column("maintenance_mode", sa.Boolean(), nullable=False),
        sa.Column("new_registrations", sa.Boolean(), nullable=False),
        sa.Column("admin_approval", sa.Boolean(), nullable=False),
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


def downgrade() -> None:
    op.drop_table("admin_settings")
