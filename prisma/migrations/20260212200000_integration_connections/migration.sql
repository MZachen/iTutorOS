-- Integration connections
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'IntegrationProvider') THEN
        CREATE TYPE "IntegrationProvider" AS ENUM (
            'FACEBOOK',
            'MESSENGER',
            'INSTAGRAM',
            'TIKTOK',
            'X',
            'LINKEDIN',
            'SNAPCHAT',
            'PINTEREST',
            'YOUTUBE',
            'WHATSAPP'
        );
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "IntegrationConnection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "credentials_encrypted" TEXT,
    "connected_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "IntegrationConnection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "IntegrationConnection_organization_id_provider_key" ON "IntegrationConnection"("organization_id", "provider");
CREATE INDEX IF NOT EXISTS "IntegrationConnection_organization_id_idx" ON "IntegrationConnection"("organization_id");
CREATE INDEX IF NOT EXISTS "IntegrationConnection_provider_idx" ON "IntegrationConnection"("provider");

ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_organization_id_fkey"
  FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_created_by_user_id_fkey"
  FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_updated_by_user_id_fkey"
  FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
