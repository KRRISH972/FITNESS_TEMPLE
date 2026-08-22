---
name: Import setup
description: Setup steps for the imported Fitness Temple pnpm workspace project
---

# Import Setup

## What was imported
A pnpm monorepo with three artifacts:
- `artifacts/fitness-temple` — React/Vite gym website (Fitness Temple)
- `artifacts/api-server` — Express 5 API with Drizzle ORM + PostgreSQL
- `artifacts/mockup-sandbox` — design mockup previewer

## Setup done
1. Ran `pnpm install --frozen-lockfile` to install all workspace dependencies
2. Restarted all three artifact workflows
3. All services are RUNNING:
   - Fitness Temple web: port 26022, preview path /
   - API Server: port 8080, preview path /api
   - Mockup sandbox: port 8081, preview path /__mockup

## Key facts
- `DATABASE_URL` is automatically managed by Replit's built-in PostgreSQL
- The Fitness Temple Vite config already respects `$PORT` and `$BASE_PATH` from the artifact service
- The API currently only has a health check route (GET /api/healthz)
- DB schema is empty (only placeholder exports in lib/db/src/schema/)
- `SESSION_SECRET` secret is set

**Why:** Imported project needed dependencies installed and workflows restarted before the preview would work. The DNS error the user saw was a temporary Replit proxy issue.
