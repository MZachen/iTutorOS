# iTutorOS - Object Completion Checklist (V1)

Definition of "complete" (Option 2):
- DB model exists and matches spec
- API endpoints exist for MVP usage (CRUD + archive where applicable)
- Key validations + business rules enforced in API
- Tenant scoping + role permissions enforced (once Supabase auth is added)

Note: Auth guards + org scoping are now enforced on all implemented routes.

Status key:
- DONE
- PARTIAL
- TODO

## Objects

### Organization
- DB: DONE
- API: PARTIAL (`POST /organizations` (public for now), `GET /organizations` (auth-scoped))
- Missing: `GET /organizations/:id`, update, archive, tighten `POST /organizations`, audit fields

### Location
- DB: DONE
- API: PARTIAL (`POST /locations` (auth), `GET /locations?organization_id=...` (auth))
- Missing: update, archive, LocationHours management, audit fields

### LocationHours
- DB: DONE
- API: TODO
- Missing: create/update/list by location, validations (day_of_week 0-6, open/close rules)

### Room
- DB: DONE
- API: PARTIAL (`POST /rooms` (auth), `GET /rooms?location_id=...` (auth))
- Missing: update, archive (if desired)

### ServiceOffered
- DB: DONE
- API: PARTIAL (`POST /services-offered` (auth), `GET /services-offered?location_id=...` (auth))
- Missing: update, deactivate/activate

### User
- DB: DONE
- API: PARTIAL (`POST /users` (auth + role-gated))
- Missing: "me" endpoint, safe role assignment rules, admin management UX

### UserRole / UserLocation
- DB: DONE
- API: PARTIAL (`GET /user-locations?organization_id=...` (auth))
- Missing: admin management endpoints (optional for V1)

### Tutor / TutorLocation
- DB: DONE
- API: PARTIAL (`POST /tutors` (auth) creates TutorLocation joins)
- Missing: list/get/update/archive, role rules

### Lead
- DB: DONE
- API: PARTIAL (`POST /leads`, `GET /leads?organization_id=...`, `PATCH /leads/:id`) (auth)
- Missing: archive, strict enum validation, audit fields

### Parent
- DB: DONE
- API: PARTIAL (`POST /parents/with-student`)
- Missing: CRUD endpoints, archive, audit fields

### Student
- DB: DONE
- API: PARTIAL (`GET /students?location_id=...`) (auth)
- Missing: create/update/archive, subjects join endpoints, audit fields

### Subject / Topic
- DB: DONE
- API: TODO
- Missing: list + create custom entries, seed "global" list, org-scoped custom overrides

### Product (class/workshop/camp definitions)
- DB: DONE
- API: TODO
- Missing: CRUD + archive, link to scheduling, validations

### Image
- DB: DONE
- API: TODO
- Missing: upload/storage strategy + CRUD + archive

### ScheduleEntry (+ rooms/attendees)
- DB: DONE
- API: DONE (auth enforced)
  - `POST /schedule-entries` (AD_HOC + WEEKLY + DAILY)
  - `GET /schedule-entries?location_id=...` (optional `series_id=...`)
  - `GET /schedule-entries/:id`
  - `PATCH /schedule-entries/:id/archive` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/unarchive` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/skip` (skip one occurrence in a series)
  - `PATCH /schedule-entries/:id/reschedule` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/exception` (edit one occurrence and detach from series)
  - `PATCH /schedule-entries/:id/restore-exception` (restore a detached exception back into its series)
  - `PATCH /schedule-entries/:id/rooms` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/attendees` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/service-offered` (supports `scope=THIS|FUTURE|ALL`)
  - `PATCH /schedule-entries/:id/capacity` (supports `scope=THIS|FUTURE|ALL`)
- Missing:
  - audit fields population
  - calendar/dashboard UI for series edits + exceptions
