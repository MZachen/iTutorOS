-- Marketing posts + brand fields
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'MarketingPostStatus') THEN
        CREATE TYPE "MarketingPostStatus" AS ENUM ('DRAFT', 'READY', 'POSTED');
    END IF;
END $$;

ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "company_description_text" TEXT;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "about_us_text" TEXT;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "slogan_text" TEXT;

CREATE TABLE IF NOT EXISTS "MarketingPost" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "status" "MarketingPostStatus" NOT NULL DEFAULT 'DRAFT',
    "platform_ids" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "template_style" TEXT,
    "layout_preset" TEXT,
    "aspect_ratio" TEXT,
    "copy_text" TEXT,
    "image_url" TEXT,
    "media_selection" JSONB,
    "posted_at" TIMESTAMP(3),
    "last_posted_at" TIMESTAMP(3),
    "views_count" INTEGER,
    "clicks_count" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "MarketingPost_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "MarketingPost_organization_id_idx" ON "MarketingPost"("organization_id");
CREATE INDEX IF NOT EXISTS "MarketingPost_status_idx" ON "MarketingPost"("status");

ALTER TABLE "MarketingPost" ADD CONSTRAINT "MarketingPost_organization_id_fkey"
  FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MarketingPost" ADD CONSTRAINT "MarketingPost_created_by_user_id_fkey"
  FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MarketingPost" ADD CONSTRAINT "MarketingPost_updated_by_user_id_fkey"
  FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
