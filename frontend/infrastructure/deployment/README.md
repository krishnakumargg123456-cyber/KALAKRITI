# Deployment Infrastructure

Recommended production topology:

Internet
   ?
Nginx / Load Balancer
   +-- Next.js frontend
   +-- FastAPI backend
             ?
        PostgreSQL
             +
           Redis
             ?
          Celery

Frontend:
Vercel or equivalent Next.js hosting

Backend:
Render / Railway / container platform

Database:
Managed PostgreSQL

Media:
Cloudinary or AWS S3

Secrets must be supplied through the hosting provider's environment-variable system.
