-- Add unit length minutes for service pricing
ALTER TABLE "ServiceOffered"
ADD COLUMN "unit_length_minutes" INTEGER NOT NULL DEFAULT 60;
