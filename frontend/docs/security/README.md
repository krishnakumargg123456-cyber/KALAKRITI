# Security

Security requirements for KALAKRITI:

- HTTPS in production
- JWT authentication
- secure password hashing
- environment-based secrets
- restricted CORS
- server-side authorization
- input validation
- SQLAlchemy parameterized queries
- payment verification on backend
- protected admin routes
- protected artisan routes
- no secrets in Git
- no database credentials in frontend code

Sensitive values must never be placed in NEXT_PUBLIC_* variables.
