ALTER TABLE "Student" ADD COLUMN "vision_issue" BOOLEAN DEFAULT false;
ALTER TABLE "Student" ADD COLUMN "hearing_issue" BOOLEAN DEFAULT false;

UPDATE "Student"
SET
  "vision_issue" = CASE
    WHEN "vision_ok" IS NULL THEN NULL
    ELSE NOT "vision_ok"
  END,
  "hearing_issue" = CASE
    WHEN "hearing_ok" IS NULL THEN NULL
    ELSE NOT "hearing_ok"
  END;

ALTER TABLE "Student" DROP COLUMN "vision_ok";
ALTER TABLE "Student" DROP COLUMN "hearing_ok";
