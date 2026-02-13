-- Student records
CREATE TABLE IF NOT EXISTS "StudentRecord" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "note_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "StudentRecord_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "StudentRecord_organization_id_idx" ON "StudentRecord"("organization_id");
CREATE INDEX IF NOT EXISTS "StudentRecord_student_id_idx" ON "StudentRecord"("student_id");

ALTER TABLE "StudentRecord" ADD CONSTRAINT "StudentRecord_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudentRecord" ADD CONSTRAINT "StudentRecord_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudentRecord" ADD CONSTRAINT "StudentRecord_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StudentRecord" ADD CONSTRAINT "StudentRecord_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
