# FITNESS TEMPLE THE GYM — PROJECT KNOWLEDGE FILE

> **READ THIS FILE FIRST** — Every agent/session MUST read this file before doing any work.
> It contains the project structure, architecture, and the daily work log.
> **UPDATE THIS FILE AT THE END OF EVERY SESSION** with what was done (see Session Log at bottom).

---

## 1. Project Overview

**Fitness Temple The Gym** — a gym website for Fitness Temple, Pundri, Haryana, India.

- **Tagline:** "Unleash Your Inner Power" / "Step into the darkness, forge your best self"
- **Owner & Head Trainer:** Vikas Saini
- **Phone:** 7206060744 | **Email:** krrishai0916@gmail.com
- **Address:** Near Bus Stand, Main Market, Pundri, Haryana 136026
- **Hours:** Mon–Sat 5:00 AM – 10:00 PM | Sunday CLOSED
- **Stats:** 4.7 stars, 130+ Google reviews, 500+ members, 5+ years active

The site is a dark-themed React SPA with 6 pages, an AI chat widget (Groq API), and a contact form that sends email via Brevo.

---

## 2. Tech Stack

| Layer      | Technology |
|------------|------------|
| Monorepo   | pnpm workspaces, Node.js 24, TypeScript 5.9 |
| Frontend   | React + Vite, Tailwind CSS v4, wouter (routing), framer-motion (animations), shadcn/ui (Radix), TanStack Query |
| Backend    | Express 5 (artifacts/api-server) + Vite dev-server middleware fallback |
| DB         | PostgreSQL + Drizzle ORM (`lib/db`) — schema currently EMPTY (placeholder only) |
| Validation | Zod v4, drizzle-zod |
| API codegen| Orval — generates typed client + Zod schemas from `lib/api-spec/openapi.yaml` into `lib/api-zod` |
| Email      | Brevo SMTP API (server-side only) |
| AI Chat    | Groq API — model `openai/gpt-oss-120b` (api-server route) / `GROQ_MODEL` env for Vite dev middleware |
| Logging    | pino-http |

---

## 3. File Tree (important parts)

```
FITNESS_TEMPLE/
├── FITNESS.MD                        ← THIS FILE (project knowledge + daily log)
├── replit.md                         ← Replit agent memory (older)
├── package.json                      ← root workspace scripts (build, typecheck)
├── pnpm-workspace.yaml               ← workspace config
├── .env                              ← secrets (NEVER commit/print values)
├── attached_assets/                  ← raw assets used by the site
├── screenshots/                      ← preview screenshots of the site
│
├── artifacts/
│   ├── fitness-temple/               ← MAIN WEBSITE (@workspace/fitness-temple)
│   │   ├── vite.config.ts            ← Vite config + DEV API middleware (/api/chat, /api/contact)
│   │   ├── index.html                ← SEO meta tags, fonts, favicon
│   │   ├── public/                   ← favicon.svg/png, og-image.png, robots.txt, chat-avatar.png
│   │   └── src/
│   │       ├── main.tsx              ← app entry
│   │       ├── App.tsx               ← router (wouter) + layout + page transitions
│   │       ├── index.css             ← Tailwind theme (dark, red primary #e53935-ish)
│   │       ├── pages/
│   │       │   ├── Home.tsx          ← hero, stats bar, program teasers, trainer preview, testimonials carousel, CTA
│   │       │   ├── Programs.tsx      ← Strength Training, CrossFit/Functional, Zumba & Dance details
│   │   │     │   ├── About.tsx         ← Vikas Saini story, philosophy "sweat is fat crying"
│   │       │   ├── Gallery.tsx       ← gym photos grid
│   │       │   ├── Membership.tsx    ← pricing plans
│   │       │   ├── Contact.tsx       ← contact form → POST /api/contact → Brevo email; Google Map embed
│   │       │   └── not-found.tsx     ← 404 page
│   │       ├── components/
│   │       │   ├── layout/Navbar.tsx ← sticky navbar + mobile menu
│   │       │   ├── layout/Footer.tsx
│   │       │   └── ui/               ← shadcn components + custom:
│   │       │       ├── ChatWidget.tsx    ← floating AI chat → POST /api/chat
│   │       │       ├── Reveal.tsx        ← scroll reveal animations (Reveal, StaggerContainer, StaggerItem)
│   │       │       └── CountUp.tsx       ← animated number counter (stats bar)
│   │       ├── hooks/                ← use-toast, use-mobile
│   │       └── lib/utils.ts          ← cn() helper
│   │
│   ├── api-server/                   ← EXPRESS API (@workspace/api-server, port 5000/8080)
│   │   └── src/
│   │       ├── index.ts              ← server entry
│   │       ├── app.ts                ← express app (cors, json, pino-http, mounts /api)
│   │       ├── routes/index.ts       ← mounts health, contact, chat routers
│   │       ├── routes/health.ts      ← GET /api/healthz
│   │       ├── routes/contact.ts     ← POST /api/contact → validates w/ Zod → Brevo email to GYM_EMAIL
│   │       ├── routes/chat.ts        ← POST /api/chat → Groq openai/gpt-oss-120b (system prompt has gym info; some PLACEHOLDERs remain!)
│   │       └── lib/logger.ts
│   │
│   └── mockup-sandbox/               ← design mockup previewer (@workspace/mockup-sandbox, port 8081, path /__mockup)
│
├── lib/
│   ├── api-spec/openapi.yaml         ← OpenAPI 3.1 SOURCE OF TRUTH (healthz + contact endpoints)
│   ├── api-zod/                      ← generated Zod schemas + types (@workspace/api-zod)
│   ├── db/                           ← Drizzle ORM package (@workspace/db) — schema EMPTY
│   └── api-client-react/             ← generated react-query hooks (@workspace/api-client-react)
│
├── .agents/memory/                   ← older agent memory files (import-setup, email-delivery)
└── scripts/                          ← misc (post-merge.sh, hello.ts)
```

---

## 4. Website Pages & Routes

| Route         | Page           | Content |
|---------------|----------------|---------|
| `/`           | Home.tsx       | Hero "Unleash Your Inner Power", animated stats bar (CountUp), 3 program teasers, Vikas Saini preview, testimonials carousel, CTA "Ready to Commit?" |
| `/programs`   | Programs.tsx   | Full details: Strength Training (free weights to 50kg, Fitline equipment), CrossFit/Functional (kettlebells, ropes, tire flips), Zumba & Dance |
| `/about`      | About.tsx      | Vikas Saini's story, philosophy ("sweat is fat crying"), credentials |
| `/gallery`    | Gallery.tsx    | Photos of interior, equipment, atmosphere |
| `/membership` | Membership.tsx | Plans: Monthly ₹1,500/mo · Quarterly ₹4,000/3mo (Most Popular) · Annual ₹12,000/yr (incl. T-shirt, guest passes, diet plan) |
| `/contact`    | Contact.tsx    | Form (name, email, phone, interest dropdown, message) → POST /api/contact → Brevo; embedded Google Map of Pundri |
| *             | not-found.tsx  | 404 |

Design system: near-black background (#0a0a0a / #050505), white text, red primary accent, uppercase bold headings, framer-motion page transitions + scroll reveals.

---

## 5. API Endpoints

Base path: `/api`

| Method | Path       | Purpose | Notes |
|--------|------------|---------|-------|
| GET  | `/api/healthz` | Health check | returns `{ status }` |
| POST | `/api/contact` | Contact form | Validates via `SubmitContactFormBody` (Zod). Sends HTML email via Brevo to krrishai0916@gmail.com, replyTo = submitter. Errors: 400 invalid, 503 no key/Brevo fail |
| POST | `/api/chat`    | AI chat widget | `{ messages: [{role, content}] }` → Groq completion → `{ reply }`. Uses env key |

**Two implementations exist** (important!):
1. `artifacts/api-server/src/routes/*.ts` — production Express service (chat uses env var **`FITNESS_TEMPLE`** for the Groq key ⚠️ inconsistent naming).
2. `artifacts/fitness-temple/vite.config.ts` `apiPlugin` — dev-only middleware duplicating both endpoints (uses **`GROQ_API_KEY`**, default model `openai/gpt-oss-120b`). Keeps local dev working without running Express.

Interest options in contact form: `membership`, `pt`, `crossfit`, `zumba`.

---

## 6. Environment Variables (.env — never expose values)

| Key             | Used by | Purpose |
|-----------------|---------|---------|
| `GROQ_API_KEY`  | vite.config.ts dev chat middleware | Groq AI chat |
| `GROQ_MODEL`    | vite.config.ts | chat model override |
| `BREVO_API_KEY` | contact routes (both) | transactional email |
| `GYM_EMAIL`     | vite.config.ts | sender/recipient for contact emails |
| `SESSION_SECRET`| reserved | already set |
| `VITE_API_URL`  | frontend (build-time) | Backend base URL. Empty = same-origin (`/api`). Set on Vercel to Render URL (e.g. `https://fitness-temple-api.onrender.com`) |

⚠️ `artifacts/api-server/src/routes/chat.ts` reads the Groq key from `process.env["FITNESS_TEMPLE"]` — NOT `GROQ_API_KEY`. Must be aligned or the env var must be provided on Replit.

---

## 7. Commands

```bash
pnpm install                                        # install all workspaces
pnpm --filter @workspace/fitness-temple run dev     # web app (Vite, binds $PORT or 5173)
pnpm --filter @workspace/api-server run dev         # Express API
pnpm run typecheck                                  # typecheck everything
pnpm run build                                      # typecheck + build all packages
pnpm --filter @workspace/api-spec run codegen       # regen Orval client/zod from openapi.yaml
pnpm --filter @workspace/db run push                # push Drizzle schema (dev only)
```

---

## 8. Known TODOs / Gotchas

- [ ] `artifacts/api-server/src/routes/chat.ts` still has **PLACEHOLDER** strings for gym address, membership prices, and class schedule (search file for "PLACEHOLDER"). The Vite dev-middleware copy already has real values filled in.
- [ ] Membership prices mismatch: website shows ₹1,500/₹4,000/₹12,000 but chatbot placeholder lists ₹800–₹7,000 plans. Needs reconciliation.
- [ ] Chat Groq env var naming mismatch (`FITNESS_TEMPLE` vs `GROQ_API_KEY`).
- [ ] DB schema (`lib/db/src/schema/index.ts`) is empty — no tables defined yet.
- [ ] After GitHub re-import on Replit: artifacts must be re-registered via createArtifact.
- [ ] Brevo sender address must be verified in Brevo account or emails fail silently (503).
- [ ] Secrets must NEVER go into frontend code or be committed.

---

## 9. SESSION LOG (daily updates)

> Rule: every agent/session appends an entry here at the end of its work.
> Format: date • what was done • files touched • next steps.

### Session 001 — 2026-08-22
- **Done:**
  - Read entire project structure, file tree, and codebase (frontend pages, api-server routes, vite config, openapi spec, db schema, agent memory files).
  - Created this `FITNESS.MD` as the central knowledge + daily-log file for all future agents/sessions.
  - Documented stack, architecture, pages, API, env vars, commands, and known TODOs.
- **Files touched:** `FITNESS.MD` (created).
- **Current state:** Site is feature-complete as a static marketing site + AI chat + working contact form. No DB tables yet.
- **Next steps (candidates):** fill remaining PLACEHOLDERs in `api-server/src/routes/chat.ts`, align membership prices between Membership page and chatbot, unify Groq env var name, define first Drizzle tables if persistence is needed.

### Session 002 — 2026-08-29
- **Done (local hosting — single command, survives reboot):**
  - Verified production build (API server + frontend) compiles with no errors.
  - Started combined server (Express serves API **and** built frontend on one port) via PM2:
    - `pnpm start:bg` = build + `pm2 startOrRestart ecosystem.config.cjs` (single command for frontend+backend).
    - Verified: `/` → 200, `/api/healthz` → 200, `/api/chat` → 200 (Groq reply), `/api/contact` → 400 on empty body (validation works).
  - PM2 autostart on Windows login: `scripts/autostart.bat` copied to Startup folder (`...\Start Menu\Programs\Startup\FitnessTemple-autostart.bat`). Website auto-starts after every reboot/login. No admin needed.
  - `start-website.bat` / `stop-website.bat` exist for manual start/stop.
- **Done (24/7 public link — cloud hosting):**
  - Added `render.yaml` blueprint for Render.com (free plan). Build: `pnpm install --frozen-lockfile && pnpm run build:prod`; Start: `node scripts/start-prod.mjs`; health check `/api/healthz`; unknown env vars `GROQ_API_KEY`, `BREVO_API_KEY`, `SESSION_SECRET` (`sync: false` — user sets them in Render dashboard after deploy).
  - Repo remote: `https://github.com/KRRISH972/FITNESS_TEMPLE.git` (personal fork). `.env` is git-ignored; `fitness-temple-local.zip` contains only `.env.example` (no secret leak).
- **Files touched:** `render.yaml` (new), `scripts/autostart.bat` (new), `FITNESS.MD` (this log).
- **Next steps (user-side):** push `render.yaml` + local-start scripts to GitHub → render.com → New → Blueprint → pick repo → set `GROQ_API_KEY`/`BREVO_API_KEY`/`SESSION_SECRET` → Deploy → gets `https://fitness-temple.onrender.com`.
- **Gotchas:** Render free plan spins down after 15 min idle (cold start ~30s on first visit). Don't define `PORT` for Render (it injects its own). Local server on port 8080.

### Session 003 — 2026-08-30
- **Done (frontend→Vercel + backend→Render split deployment):**
  - Frontend ab API calls me **env-based base URL** use karta hai: `src/lib/api.ts` exports `API_BASE_URL` = `VITE_API_URL` (build-time) else empty (same-origin). Updated `ChatWidget.tsx` (`/api/chat`) and `Contact.tsx` (`/api/contact`) to prefix `${API_BASE_URL}`.
  - Added `vercel.json` — Vercel builds only `@workspace/fitness-temple`, output `artifacts/fitness-temple/dist/public`, SPA rewrite to `/index.html`.
  - Updated `render.yaml` — name `fitness-temple-api`, builds **only** `@workspace/api-server`, start `node --enable-source-maps artifacts/api-server/dist/index.mjs`. Backend no longer builds/serves the frontend (that's Vercel's job now).
  - Verified: root `pnpm run typecheck` (all workspaces pass) + frontend build with `VITE_API_URL=https://fitness-temple-api.onrender.com` (URL injected into bundle).
  - Local combined setup (Session 002) unchanged & still works — `VITE_API_URL` empty = same-origin.
- **Files touched:** `src/lib/api.ts` (new), `ChatWidget.tsx`, `Contact.tsx`, `vercel.json` (new), `render.yaml`, `FITNESS.MD` (this log).
- **Next steps (user-side):**
  1. Push to GitHub → **Render** → New Blueprint → set `GROQ_API_KEY`, `BREVO_API_KEY`, `SESSION_SECRET` → gets `https://fitness-temple-api.onrender.com`.
  2. **Vercel** → Import repo → Framework=Vite → set env `VITE_API_URL=https://fitness-temple-api.onrender.com` → Deploy → gets `https://<project>.vercel.app`.
   3. Vercel `cors()` is wide-open (`*`), so Vercel→Render calls work without extra config. Render free tier spins down after 15 min idle (~30s cold start).

### Session 004 — 2026-08-30
- **Done (backend deployed live on Render + chat model fix):**
  - Backend **deployed and LIVE** on Render at `https://fitness-temple-api.onrender.com` (Blueprint from repo, `render.yaml`). Env vars set on Render: `GROQ_API_KEY`, `BREVO_API_KEY`, `GROQ_MODEL`, `GYM_EMAIL`, `NODE_VERSION`, `SESSION_SECRET`.
  - Verified live: `GET /api/healthz` → 200 ✅, `POST /api/contact` → 200 (Brevo email sent) ✅, `POST /api/chat` → 200 (Groq reply) ✅.
  - **Bug fix:** old Groq model `llama-3.3-70b-versatile` returned `model_not_found` (no longer available/accessible on the account). Changed default to **`openai/gpt-oss-120b`** (valid on the key):
    - `chat.ts:93` — env `GROQ_MODEL` fallback now `openai/gpt-oss-120b`.
    - `render.yaml` — `GROQ_MODEL` default value updated to `openai/gpt-oss-120b`.
    - (vite.config.ts already defaulted to `openai/gpt-oss-120b`.)
  - Confirmed valid models on this Groq key: `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.6-27b`, `qwen/qwen3.8-27b`, etc.
- **Files touched:** `artifacts/api-server/src/routes/chat.ts`, `render.yaml`, `FITNESS.MD` (this log).
- **Done later same day (frontend LIVE on Vercel):**
  - Deployed frontend to **Vercel** via CLI: project `kisshu1/fitness-temple`, prod URL **`https://fitness-temple-eight.vercel.app`** (alias), deployment URL `https://fitness-temple-49u5xc8rd-kisshu1.vercel.app`.
  - Set env `VITE_API_URL=https://fitness-temple-api.onrender.com` (production) on Vercel.
  - Verified: `GET /` → 200, SPA `/programs` → 200, JS bundle contains `fitness-temple-api.onrender.com`.
  - GitHub repo auto-connected for future auto-deploys on push.
- **Files touched (Vercel step):** none in repo (all via Vercel cloud config).
- **Remaining:** optionally add a custom domain on Vercel; monitor `vercel.json` monorepo build.
- **Gotcha:** IF Groq model ever fails again with `model_not_found`, check available models via `GET https://api.groq.com/openai/v1/models` with the key, or bump `GROQ_MODEL` on Render.


<!-- APPEND NEW SESSIONS BELOW THIS LINE -->
