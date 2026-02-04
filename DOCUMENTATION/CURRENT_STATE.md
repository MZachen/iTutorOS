# iTutorOS - Current State

## Goal (1 sentence)
Build a deployment-ready V1 SaaS for tutoring businesses: onboarding -> simple marketing website + lead capture -> CRM (parents/students) -> scheduling.

## Tech Stack (current)
- Fullstack: Next.js (TypeScript) at repo root (UI + API route handlers)
- DB: Postgres (Supabase) + Prisma ORM (schema in `prisma/schema.prisma`)
- Auth: planned (Supabase Auth)
- Legacy: prior NestJS API still exists in `itutoros-api/` (pending deletion; currently locked by another process)

## What's Done
- Next.js app runs locally; API endpoints migrated from Nest to Next route handlers.
- Prisma schema + migrations consolidated in `prisma/`.
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
- Authentication + authorization (tenant isolation + roles)
- Calendar/dashboard UI for series edits + exceptions (API supports it; UX not built yet)
- Remaining object routes (e.g., LocationHours, Subject/Topic, Product, Image, fuller CRUD for others)
- Automated tests (critical flows)
- Dashboard UI + public website UI
- Billing + deployment pipeline

## What's Next (recommended order)
1) Add Supabase Auth + org/role guards to every API route
2) Implement the next missing object routes per `DOCUMENTATION/OBJECT_CHECKLIST.md`
3) Start the dashboard UX (onboarding -> locations/services/rooms/tutors -> CRM -> calendar)

## Environment
- `DATABASE_URL` required
- `PORT` optional
