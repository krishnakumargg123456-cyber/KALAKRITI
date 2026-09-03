# Nginx

Nginx can be used as the production reverse proxy.

Recommended routing:

/api/* ? FastAPI backend
/*     ? Next.js frontend

Responsibilities:

- TLS termination
- request forwarding
- compression
- security headers
- connection limits
- static asset caching

Do not place application secrets in nginx configuration.
