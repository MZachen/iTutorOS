# iTutorOS - Current State

## Goal (1 sentence)
Build a deployment-ready V1 SaaS for tutoring businesses: onboarding -> simple marketing website + lead capture -> CRM (parents/students) -> scheduling.

## Tech Stack (current)
- Fullstack: Next.js (TypeScript) at repo root (UI + API route handlers)
- DB: Postgres (Supabase) + Prisma ORM (schema in `prisma/schema.prisma`)
- Auth: Supabase Auth (email/password + email confirmation) + API guards
- Legacy: NestJS is no longer used. Any leftover `itutoros-api/` folder is untracked and can be deleted/ignored.

## What's Done
- Next.js app runs locally; API endpoints migrated from Nest to Next route handlers.
- Prisma schema + migrations consolidated in `prisma/`.
- Supabase Auth guards added to API routes (Bearer JWT required), with org + role enforcement (bootstrap + org create remain public for now).
- Basic auth UX pages:
  - `/signup`, `/login`, `/auth/callback`
  - `/onboarding` (creates org + bootstraps owner)
  - `/dashboard` (proves calling protected API with Bearer token)
- Root `/` route gates auth:
  - logged in -> `/dashboard`
  - logged out -> `/signup` for first-time visitors, otherwise `/login` (cookie-based)
- Organization Settings UX page:
  - `/settings/organization` (edit organization profile fields after onboarding)
- Setup wizard UX page:
  - `/setup` (multi-step wizard: Location -> Rooms (physical only) -> Services -> Subjects/Topics -> Done; can add multiple locations)
- Owner bootstrap defaults:
  - new OWNER also gets a Tutor profile + `TUTOR` role (assume independent tutors)
- ScheduleEntry logic:
  - Tutor + room conflicts use buffer/blocked windows (`blocked_end_at`)
  - Student conflicts use real overlap only (`start_at/end_at`)
  - Capacity enforced (attendees <= capacity; capacity >= current attendee count)
  - Recurrence supported (AD_HOC + WEEKLY + DAILY via `POST /schedule-entries`)
  - Series-level edits supported via `scope=THIS|FUTURE|ALL` on ScheduleEntry PATCH endpoints
  - Single-occurrence tools: unarchive, skip occurrence, exception edit (detach from series), restore exception back into series
  - List archived entries via `GET /schedule-entries?location_id=...&archived=true`
- V1 object completion checklist created: `DOCUMENTATION/OBJECT_CHECKLIST.md`.

## What's Not Done (blocking "real SaaS")
- Production auth hardening (invites, remove public bootstrap, stronger org/role management UI, optional DB RLS)
- Calendar/dashboard UI for series edits + exceptions (API supports it; UX not built yet)
- Remaining object routes (e.g., LocationHours, Product, Image, fuller CRUD for others)
- Automated tests (critical flows)
- Dashboard UI + public website UI
- Billing + deployment pipeline

## Roadmap (near-term)
- A) Setup wizard UX polish (Location -> Rooms -> Services + clearer explanations): DONE
- B) Auth UX polish (friendly login screen): DONE
- C) Organization settings expansion (manage locations/rooms/services) + cleanup any legacy artifacts: TODO

## What's Next (recommended order)
1) Do roadmap C (settings expansion + cleanup)
2) Continue implementing remaining objects per `DOCUMENTATION/OBJECT_CHECKLIST.md`
3) Build the real dashboard UX (locations/services/rooms/tutors -> CRM -> calendar)

## Environment
- `DATABASE_URL` required
- `PORT` optional
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` required for auth
