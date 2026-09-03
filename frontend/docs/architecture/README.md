# KALAKRITI Architecture

## Application Flow

Browser
  ?
Next.js App Router
  ?
Services / API client
  ?
FastAPI REST API
  ?
SQLAlchemy
  ?
PostgreSQL

Supporting infrastructure:

Redis ? caching / queues
Celery ? asynchronous jobs
Cloudinary/S3 ? media storage
Razorpay ? payments

## Frontend Principles

- reusable components
- feature-oriented services
- Zustand for client state
- Axios API client
- server/client boundaries respected
- heritage visual design system

## Backend Principles

- FastAPI
- Pydantic validation
- SQLAlchemy 2
- Alembic migrations
- PostgreSQL
- JWT authentication

## Security

The browser must never connect directly to PostgreSQL, Redis, or private storage credentials.
