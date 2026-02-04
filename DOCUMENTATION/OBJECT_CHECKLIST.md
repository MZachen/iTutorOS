# iTutorOS - Object Completion Checklist (V1)

Definition of "complete" (Option 2):
- DB model exists and matches spec
- API endpoints exist for MVP usage (CRUD + archive where applicable)
- Key validations + business rules enforced in API
- Tenant scoping + role permissions enforced (once Supabase auth is added)

Status key:
- DONE
- PARTIAL
- TODO

## Objects

### Organization
- DB: DONE
- API: PARTIAL (`POST /organizations`, `GET /organizations`)
- Missing: `GET /organizations/:id`, update, archive, auth-scoped access, audit fields

### Location
- DB: DONE
- API: PARTIAL (`POST /locations`, `GET /locations?organization_id=...`)
- Missing: update, archive, LocationHours management, auth-scoped access, audit fields

### LocationHours
- DB: DONE
- API: TODO
- Missing: create/update/list by location, validations (day_of_week 0-6, open/close rules)

### Room
- DB: DONE
- API: PARTIAL (`POST /rooms`, `GET /rooms?location_id=...`)
- Missing: update, archive (if desired), auth-scoped access

### ServiceOffered
- DB: DONE
- API: PARTIAL (`POST /services-offered`, `GET /services-offered?location_id=...`)
- Missing: update, deactivate/activate, auth-scoped access

### User
- DB: DONE
- API: PARTIAL (`POST /users`), no auth yet
- Missing: auth integration (Supabase), "me" endpoint, safe role assignment rules, org scoping enforcement

### UserRole / UserLocation
- DB: DONE
- API: PARTIAL (`GET /user-locations?organization_id=...`)
- Missing: admin management endpoints (optional for V1), auth-scoped access

### Tutor / TutorLocation
- DB: DONE
- API: PARTIAL (`POST /tutors` creates TutorLocation joins)
- Missing: list/get/update/archive, auth-scoped access, role rules

### Lead
- DB: DONE
- API: PARTIAL (`POST /leads`, `GET /leads?organization_id=...`, `PATCH /leads/:id`)
- Missing: archive, strict enum validation, auth-scoped access, audit fields

### Parent
- DB: DONE
- API: PARTIAL (`POST /parents/with-student`)
- Missing: CRUD endpoints, archive, auth-scoped access, audit fields

### Student
- DB: DONE
- API: PARTIAL (`GET /students?location_id=...`)
- Missing: create/update/archive, subjects join endpoints, auth-scoped access, audit fields

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
- API: DONE (pre-auth)
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
  - auth + role rules (tutors cannot create/edit schedule entries)
  - audit fields population
  - calendar/dashboard UI for series edits + exceptions
