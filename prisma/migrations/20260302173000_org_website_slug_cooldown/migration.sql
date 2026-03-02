ALTER TABLE "Organization"
ADD COLUMN IF NOT EXISTS "website_slug_updated_at" TIMESTAMP(3);
