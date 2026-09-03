# Database Seeds

Seed data is intended for development and demonstration environments.

Never place production credentials, passwords, access tokens, payment secrets, or personal data in seed files.

Recommended flow:

1. Start PostgreSQL.
2. Start the FastAPI backend.
3. Run Alembic migrations.
4. Execute the backend seed process.
5. Verify the generated records.
