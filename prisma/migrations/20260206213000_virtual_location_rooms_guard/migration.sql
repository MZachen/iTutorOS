-- Archive any existing rooms that belong to virtual locations
UPDATE "Room"
SET "archived_at" = NOW()
WHERE "archived_at" IS NULL
  AND "location_id" IN (SELECT "id" FROM "Location" WHERE "is_virtual" = TRUE);

-- Remove schedule-entry room assignments for virtual locations
DELETE FROM "ScheduleEntryRoom"
WHERE "room_id" IN (
  SELECT r."id"
  FROM "Room" r
  JOIN "Location" l ON l."id" = r."location_id"
  WHERE l."is_virtual" = TRUE
);

-- Prevent rooms from being created/assigned to virtual locations
CREATE OR REPLACE FUNCTION prevent_rooms_on_virtual_locations()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "Location"
    WHERE "id" = NEW."location_id"
      AND "is_virtual" = TRUE
  ) THEN
    RAISE EXCEPTION 'Virtual locations cannot have rooms';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS room_virtual_guard ON "Room";
CREATE TRIGGER room_virtual_guard
BEFORE INSERT OR UPDATE OF "location_id" ON "Room"
FOR EACH ROW
EXECUTE FUNCTION prevent_rooms_on_virtual_locations();
