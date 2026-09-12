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

✅ `artifacts/api-server/src/routes/chat.ts` now reads the Groq key from `process.env["GROQ_API_KEY"]` with fallback to `process.env["FITNESS_TEMPLE"]` (fixed Session 008) — both names work.

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

- [x] `artifacts/api-server/src/routes/chat.ts` no longer has PLACEHOLDER strings — real address, membership prices, and class schedule in `/api-server/src/routes/chat.ts` (fixed Session 008). Both api-server and vite dev-middleware copies now aligned.
- [x] Membership prices mismatch FIXED (Session 008): chatbot now lists ₹1,500/₹4,000/₹12,000 matching the Membership page. Also fixed Zumba timing mismatch (was "Tue/Thu 7–8 PM", now "Tue/Thu/Sat 6–7 PM").
- [x] Chat Groq env var naming FIXED (Session 008): `chat.ts` reads `process.env["GROQ_API_KEY"] ?? process.env["FITNESS_TEMPLE"]` — both names work.
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

### Session 005 — 2026-08-30
- **Done (chat widget upgraded — floating + animated + "AI Chat" label):**
  - `ChatWidget.tsx` — floating trigger button ab **continuous bounce animation** (`chat-bob`) se upar-neeche halka-sa hila raha hai (floating feel).
  - Added **"AI Chat" label pill** with a Sparkles icon, sitting **above** the chat button — gradient red bg, glowing (`pulse-glow`), always visible (not only on hover).
  - Enhanced button glow: added a soft blurred `pulse-glow` halo + faster `animate-ping` ring; online green dot now pulses (`scale` repeat animation) for extra life.
  - `index.css` — added new `@keyframes chat-bob` (gentle 10px up/down bounce for the floating button).
- **Files touched:** `artifacts/fitness-temple/src/components/ui/ChatWidget.tsx`, `artifacts/fitness-temple/src/index.css`.
- **Verified:** `pnpm --filter @workspace/fitness-temple run typecheck` + `run build` both pass (built in 43s).
- **Next step (user-side):** push + Vercel auto-deploys on commit (GitHub repo is connected), or run `npx vercel deploy --prod` manually.


### Session 006 — 2026-09-08
- **Done (on-page SEO overhaul — all 11 points):**
  1. **Titles/Meta descriptions** — already per-page via `useSEO`; verified each page (Home, Programs, About, Gallery, Membership, Contact).
  2. **Heading hierarchy** — Home hero was a `<div>` (no h1) → now real `<h1>`; Home `h4` eyebrow → `<span>`; About stat `h4` → `<span>`; Membership plan titles + PT `h3` → `h2`; Programs cards wrapped in `<article>`; 404 now dark-themed + `noindex`.
  3. **Clean URLs** — already clean (`/`, `/programs`, `/about`, `/gallery`, `/membership`, `/contact`) via wouter + vercel SPA rewrite.
  4. **Internal linking** — Footer "Programs" column converted from plain text to links to `/programs`; footer contact info now `<address>` with `tel:`/`mailto:` links.
  5. **Alt text** — converted CSS-`background-image` divs to real `<img>` tags with descriptive alt across Home (hero, program teasers, trainer, CTA), Programs (all 5 program cards + header), About (3 trainer images), Gallery grid (all 7 images, now `<figure>`). Decorative images get `alt=""` + `aria-hidden`.
  6. **Semantic tags** — `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<address>`, `<nav>`, `<footer>` in place; not-found dark-themed.
  7. **JSON-LD** — index.html upgraded to `@graph` with `WebSite` + `HealthClub` (founder, full address incl. postal 136026, departments), plus `FAQPage` (5 Q&As); per-page `BreadcrumbList` injected dynamically via `useSEO`.
  8. **Robots.txt** — polished (explicit disallows, sitemap ref).
  9. **Sitemap.xml** — rebuilt with updated `lastmod` 2026-09-08 + prioritized URLs.
  10. **Speed** — `fetchPriority="high"` on hero/About hero, `loading="lazy"` + `decoding="async"` on all below-fold images; already had gzip, manualChunks, code-split lazy routes.
  11. **Meta polish** — absolute `og:image`/`twitter:image` URLs; `useSEO` now supports `robots`, `og:url`, and `breadcrumbs`.
- **Files touched:** `index.html`, `src/hooks/useSEO.ts`, `src/pages/{Home,Programs,About,Membership,Contact,not-found}.tsx`, `src/pages/Gallery.tsx`, `src/components/layout/Footer.tsx`, `public/robots.txt`, `public/sitemap.xml`, `FITNESS.MD`.
- **Verified:** `pnpm --filter @workspace/fitness-temple run typecheck` ✅ and `run build` ✅ (built in ~28s).
- **Gotcha:** SPA is client-rendered — per-page title/meta only visible to JS-capable crawlers (Google renders JS, so OK). SSR/prerender would be the next-level improvement.

### Session 007 — 2026-09-11
- **Done (professional-grade SEO overhaul — 14-point audit):**
  1. **Titles** — All page titles tightened to 50–60 chars. Format: `Primary Keyword | Brand | Location`. Home: "Fitness Temple - Best Gym in Pundri, Haryana" (49 chars).
  2. **Meta descriptions** — All rewritten to 148–157 chars with target keyword + CTA. Home: "Pundri's #1 gym for strength training, CrossFit, Zumba & personal training..." (152 chars).
  3. **Heading hierarchy** — Fixed: Membership plan titles `h2→h3` (under h1); Contact "Contact Details" + "Gym Hours" + "Send a Message" `h3→h2` (direct children of h1). All pages now: exactly ONE h1, h2s for sections, h3s for sub-items.
  4. **Image optimization** — All 10 generic image files renamed from UUIDs/screenshots to descriptive slugs (e.g. `eb71bb4d-...webp` → `strength-training-equipment-fitline.webp`). Imports updated across all 6 files.
  5. **URL structure** — Already clean lowercase hyphenated routes. No changes needed.
  6. **Internal linking** — Added strategic cross-page links: Home "programs" → /programs; Home CTA now dual-button (Join + Contact); Membership PT "coaching" → /programs; About "gym" → /programs; Gallery "View membership plans" → /membership.
  7. **Canonical tags** — Verified consistent `https://fitnesstemple.in/[page]` via `useSEO` on every page.
  8. **Structured data** — (a) `useSEO` hook enhanced with `faqItems` + `reviews` arrays → per-page JSON-LD FAQ + AggregateRating/Review. (b) index.html HealthClub: `slogan`, `areaServed`, `makesOffer` (replaced deprecated `hasOfferCatalog`). (c) Global FAQPage removed → now page-specific per page.
  9. **Sitemap.xml** — Updated `lastmod` to 2026-09-11.
  10. **Robots.txt** — Cleaned up, `Disallow: /api/` + `/__mockup`, `Sitemap:` ref.
  11. **OG/Twitter** — Added `og:image:type`, `og:locale:alternate` (hi_IN), better `twitter:image:alt`. Index.html title/description tightened to match Home page.
  12. **Performance** — Removed unused `Inter` font from index.html. Added `preload` for `og-image.png`. Verified: gzip 24.7KB Home JS, 134KB CSS.
  13. **Mobile** — Confirmed responsive via Tailwind breakpoints + `prefers-reduced-motion` + safe-area insets.
  14. **Accessibility** — (a) Contact form: all inputs now have `id` + matching `<label htmlFor>`, `type="tel"`, `type="email"`, `autoComplete`. (b) Error messages use `role="alert"`. (c) Skip-to-content link in App.tsx. (d) Google Maps iframe has `title`.
- **Files touched (16):** `src/hooks/useSEO.ts`, `index.html`, `public/robots.txt`, `public/sitemap.xml`, `src/App.tsx`, `src/pages/{Home,Programs,About,Gallery,Membership,Contact}.tsx`, `src/components/layout/{Navbar,Footer}.tsx`, plus 10 renamed image files in `attached_assets/`.
- **Verified:** `pnpm --filter @workspace/fitness-temple run typecheck` ✅ + `run build` ✅ (31s).

### Session 008 — 2026-09-12
- **Done (site health audit + 2 bug fixes):**
  - **Map overlay fix on /contact** — Google Maps embed was invisible because of an aggressive CSS `filter: invert(90%) hue-rotate(180deg)` on the `<iframe>`. Removed the filter and cleaned up the embed URL in `src/pages/Contact.tsx`. Map now renders normally (light theme). Committed + pushed as `844f073`.
  - **Chatbot pricing/schedule mismatch fixed** — The AI chat replied with OLD placeholder pricing (₹800/₹1,200/₹2,100/₹7,000) that contradicted the Membership page (₹1,500/₹4,000/₹12,000), and Zumba timing was "Tue/Thu 7–8 PM" vs website "Tue/Thu/Sat 6–7 PM". Aligned `MEMBERSHIP_PLANS` + `CLASS_SCHEDULE` in BOTH:
    - `artifacts/api-server/src/routes/chat.ts`
    - `artifacts/fitness-temple/vite.config.ts` (dev middleware)
  - **Env var naming confirmed fixed** — `chat.ts` reads `GROQ_API_KEY ?? FITNESS_TEMPLE`; updated stale ⚠️ note in section 6 and checked off 3 TODOs in section 8 (no PLACEHOLDERs, price alignment, env naming).
  - **Site health verification** — `pnpm --filter @workspace/fitness-temple run build` ✅ (50s); dev server boots on :5173 and returns HTTP 200 with correct `<title>`; no leftover old-image references; no TODO/FIXME/PLACEHOLDER in frontend src.
- **Files touched:** `src/pages/Contact.tsx`, `artifacts/api-server/src/routes/chat.ts`, `artifacts/fitness-temple/vite.config.ts`, `FITNESS.MD`.
- **Verified:** typecheck ✅ + build ✅.
- **Next steps:** re-deploy happened automatically on push (Vercel + Render rebuild). Confirm map + chat on live site.
