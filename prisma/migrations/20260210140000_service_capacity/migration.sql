-- Add capacity to services
ALTER TABLE "ServiceOffered" ADD COLUMN "capacity" INTEGER NOT NULL DEFAULT 1;
