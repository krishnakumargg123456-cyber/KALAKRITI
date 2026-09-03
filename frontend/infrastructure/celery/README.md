# Celery

Celery is intended for asynchronous backend jobs such as:

- email notifications
- order notifications
- image processing
- scheduled maintenance
- analytics aggregation

Recommended architecture:

FastAPI ? Redis ? Celery Worker

Celery workers must run from the backend environment, not from the Next.js frontend.
