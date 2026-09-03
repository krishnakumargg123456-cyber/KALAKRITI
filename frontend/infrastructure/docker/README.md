# Docker Infrastructure

The frontend and backend can be deployed independently.

This compose file currently provides Redis for:

- caching
- background jobs
- Celery
- rate limiting
- temporary application state

PostgreSQL remains the authoritative application database and is managed by the backend environment.

Never commit secrets directly into Docker configuration.
