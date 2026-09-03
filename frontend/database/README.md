# KALAKRITI Database

The production database is PostgreSQL and is managed by the FastAPI backend through SQLAlchemy and Alembic.

Frontend does not connect directly to PostgreSQL.

Architecture:

Next.js ? FastAPI ? SQLAlchemy ? PostgreSQL

Development database:
kalakriti

Database responsibilities:
- schema migrations: backend/Alembic
- seed data: database/seeds
- test fixtures: database/fixtures
- custom SQL/indexes: database/sql
