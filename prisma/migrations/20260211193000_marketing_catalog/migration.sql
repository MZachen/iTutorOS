-- Add marketing description fields
ALTER TABLE "Subject" ADD COLUMN IF NOT EXISTS "description_text" TEXT;
ALTER TABLE "Topic" ADD COLUMN IF NOT EXISTS "description_text" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "product_slogan_text" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "product_logo_url" TEXT;

-- Catalog media support
DO $$ BEGIN
  CREATE TYPE "CatalogMediaType" AS ENUM ('PHOTO', 'VIDEO');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "CatalogMedia" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "product_id" UUID,
    "subject_id" UUID,
    "topic_id" UUID,
    "service_code" TEXT,
    "media_type" "CatalogMediaType" NOT NULL,
    "media_url" TEXT NOT NULL,
    "caption_text" TEXT,
    "sort_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "CatalogMedia_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CatalogMedia_organization_id_idx" ON "CatalogMedia"("organization_id");
CREATE INDEX IF NOT EXISTS "CatalogMedia_product_id_idx" ON "CatalogMedia"("product_id");
CREATE INDEX IF NOT EXISTS "CatalogMedia_subject_id_idx" ON "CatalogMedia"("subject_id");
CREATE INDEX IF NOT EXISTS "CatalogMedia_topic_id_idx" ON "CatalogMedia"("topic_id");
CREATE INDEX IF NOT EXISTS "CatalogMedia_service_code_idx" ON "CatalogMedia"("service_code");
CREATE INDEX IF NOT EXISTS "CatalogMedia_archived_at_idx" ON "CatalogMedia"("archived_at");

ALTER TABLE "CatalogMedia" ADD CONSTRAINT "CatalogMedia_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CatalogMedia" ADD CONSTRAINT "CatalogMedia_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CatalogMedia" ADD CONSTRAINT "CatalogMedia_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CatalogMedia" ADD CONSTRAINT "CatalogMedia_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
