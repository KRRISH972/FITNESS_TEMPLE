# Fitness Temple The Gym

A React/Vite gym website for showcasing the gym, programs, gallery, membership options, and contact details.

## Run & Operate

- `pnpm --filter @workspace/fitness-temple run dev` — run the Fitness Temple web app in the Replit preview
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `DATABASE_URL` is automatically provided by Replit's managed PostgreSQL

The Fitness Temple web artifact is configured at the root preview path (`/`) and uses the managed artifact port from `PORT`. Its Vite server binds to `0.0.0.0` and uses the injected port.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fitness-temple/src/` — Fitness Temple React pages, components, and styles
- `artifacts/fitness-temple/vite.config.ts` — Vite host, port, base path, and build configuration
- `artifacts/api-server/` — shared Express API service
- `lib/api-spec/` — OpenAPI source of truth
- `lib/db/` — Drizzle schema and database package

## Architecture decisions

- The workspace keeps the imported pnpm monorepo structure and separate web, API, and mockup artifacts.
- The Fitness Temple frontend is a static React/Vite artifact; the API is a separate service.

## Product

Fitness Temple presents a branded gym experience with a home page, programs, trainer/about information, gallery, membership options, and contact page.

## User preferences

- The user wants the Fitness Temple web app running and visible in the preview pane.

## Secrets required

- `BREVO_API_KEY` — Brevo transactional email API key; required for the contact form to deliver emails
- `SESSION_SECRET` — already set
- `DATABASE_URL` — automatically managed by Replit's built-in PostgreSQL

## Gotchas

- Workspace dependencies must be installed with `pnpm install` after a fresh import.
- After a GitHub re-import, artifact directories exist but are not registered — run `createArtifact` (with the directory temporarily moved aside) to re-register each one, then restore the original source files.
- The AI chat assistant (`artifacts/api-server/src/routes/chat.ts`) contains PLACEHOLDER strings for gym address, membership prices, and class schedule that must be replaced with real values.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
