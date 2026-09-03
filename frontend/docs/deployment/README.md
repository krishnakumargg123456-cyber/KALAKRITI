# Deployment

## Frontend

Build:

npm run build

Start:

npm start

Required environment:

NEXT_PUBLIC_API_URL

## Backend

Run through the backend virtual environment and deployment platform.

Production should use:

- PostgreSQL
- Redis
- HTTPS
- secure secrets
- restricted CORS
- production logging

## Pre-deployment

Run:

scripts/deployment/predeploy.ps1

Never deploy with development credentials.
