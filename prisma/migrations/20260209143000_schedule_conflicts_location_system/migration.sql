-- Add Location system flag
ALTER TABLE "Location" ADD COLUMN "is_system" BOOLEAN NOT NULL DEFAULT false;

-- Add ScheduleEntry location detail
ALTER TABLE "ScheduleEntry" ADD COLUMN "location_detail" TEXT;

-- Create ScheduleConflict table
CREATE TABLE "ScheduleConflict" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "schedule_entry_id" UUID NOT NULL,
    "conflicting_schedule_entry_id" UUID NOT NULL,
    "conflict_tags" JSONB NOT NULL,
    "message" TEXT NOT NULL,
    "resource" JSONB,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,
    "resolved_by_user_id" UUID,

    CONSTRAINT "ScheduleConflict_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ScheduleConflict_organization_id_idx" ON "ScheduleConflict"("organization_id");
CREATE INDEX "ScheduleConflict_schedule_entry_id_idx" ON "ScheduleConflict"("schedule_entry_id");
CREATE INDEX "ScheduleConflict_conflicting_schedule_entry_id_idx" ON "ScheduleConflict"("conflicting_schedule_entry_id");
CREATE INDEX "ScheduleConflict_resolved_at_idx" ON "ScheduleConflict"("resolved_at");

ALTER TABLE "ScheduleConflict" ADD CONSTRAINT "ScheduleConflict_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ScheduleConflict" ADD CONSTRAINT "ScheduleConflict_schedule_entry_id_fkey" FOREIGN KEY ("schedule_entry_id") REFERENCES "ScheduleEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ScheduleConflict" ADD CONSTRAINT "ScheduleConflict_conflicting_schedule_entry_id_fkey" FOREIGN KEY ("conflicting_schedule_entry_id") REFERENCES "ScheduleEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ScheduleConflict" ADD CONSTRAINT "ScheduleConflict_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ScheduleConflict" ADD CONSTRAINT "ScheduleConflict_resolved_by_user_id_fkey" FOREIGN KEY ("resolved_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
