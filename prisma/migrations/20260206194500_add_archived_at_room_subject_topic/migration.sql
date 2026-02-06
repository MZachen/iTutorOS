-- Add archived_at for soft-archiving from Settings UI

ALTER TABLE "Room" ADD COLUMN IF NOT EXISTS "archived_at" TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS "Room_archived_at_idx" ON "Room" ("archived_at");

ALTER TABLE "Subject" ADD COLUMN IF NOT EXISTS "archived_at" TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS "Subject_archived_at_idx" ON "Subject" ("archived_at");

ALTER TABLE "Topic" ADD COLUMN IF NOT EXISTS "archived_at" TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS "Topic_archived_at_idx" ON "Topic" ("archived_at");

