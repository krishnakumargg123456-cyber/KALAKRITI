# Database Documentation

Database engine:

PostgreSQL

ORM:

SQLAlchemy 2

Migration system:

Alembic

Flow:

FastAPI ? SQLAlchemy ? PostgreSQL

Rules:

1. Never connect the browser directly to PostgreSQL.
2. Never modify production schema manually.
3. Use Alembic migrations for schema changes.
4. Keep seed and fixture data free of secrets.
5. Use environment variables for database credentials.
