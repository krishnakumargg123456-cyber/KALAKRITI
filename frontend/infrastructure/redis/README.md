# Redis

KALAKRITI uses Redis as an optional infrastructure service for:

- caching
- Celery broker/backend
- rate limiting
- short-lived application state

Default development endpoint:

redis://localhost:6379/0

Production Redis credentials must be supplied through environment variables.
