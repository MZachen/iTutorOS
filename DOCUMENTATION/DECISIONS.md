# iTutorOS - Decisions Log

## Purpose
Short, permanent choices so new chat windows can pick up instantly.

## Decisions
- Fullstack framework: Next.js (TypeScript) at repo root.
- Database: Postgres (Supabase target) with Prisma ORM.
- Multi-tenancy: `organization_id` on all tenant-scoped tables; enforce org scoping in app logic (auth/guards required).
- Deletes: soft-delete via `archived_at` on most tables.
- Time rules: store schedule times in UTC; organization has a `timezone` string for display/rules.
- Definition of "complete" for V1 objects (Option 2): DB model + API CRUD + key business rules; auth/tenant/roles enforced once Supabase Auth is added.
- Roles (V1): `OWNER`, `ADMIN`, `TUTOR`.
- Near-term roadmap: A) Org Settings page, B) Setup wizard, C) remove legacy Nest artifacts.
- Scheduling conflict rules (V1):
  - Tutor and room conflicts consider buffer/blocked time (`blocked_end_at`)
  - Student conflicts consider real session overlap only (`start_at/end_at`)
  - Edge scheduling allowed when times "touch" (end == start).
- ScheduleEntry recurrence (V1): support `AD_HOC` + `DAILY` + `WEEKLY`.
- ScheduleEntry series edits (V1): PATCH endpoints support `scope=THIS|FUTURE|ALL` for "edit this", "this and following", or "all".
- API architecture: Next.js route handlers in `app/**/route.ts` (no separate NestJS API service).
- Auth (V1): Supabase Auth via Bearer JWT; server validates with Supabase `/auth/v1/user` and enforces org + role rules.
- Organization profile (V1): require business phone + address line 1/city/state/zip; address line 2 is optional.

## Pending Decisions
- Production hardening of onboarding/auth (invites, remove public bootstrap endpoints, optional DB RLS).
- Billing provider/plan gating (Stripe recommended).
