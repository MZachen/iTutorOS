-- CreateEnum
CREATE TYPE "EmailProvider" AS ENUM ('GMAIL', 'OUTLOOK', 'IMAP');

-- CreateEnum
CREATE TYPE "EmailAuthType" AS ENUM ('OAUTH', 'IMAP');

-- CreateTable
CREATE TABLE "EmailInbox" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "provider" "EmailProvider" NOT NULL,
    "auth_type" "EmailAuthType" NOT NULL,
    "address" TEXT NOT NULL,
    "label" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "daily_scan_enabled" BOOLEAN NOT NULL DEFAULT false,
    "daily_scan_time" TEXT,
    "last_scan_at" TIMESTAMP(3),
    "credentials_encrypted" TEXT,
    "imap_host" TEXT,
    "imap_port" INTEGER,
    "imap_secure" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "EmailInbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailInbox_organization_id_idx" ON "EmailInbox"("organization_id");
CREATE INDEX "EmailInbox_provider_idx" ON "EmailInbox"("provider");
CREATE INDEX "EmailInbox_archived_at_idx" ON "EmailInbox"("archived_at");

-- AddForeignKey
ALTER TABLE "EmailInbox" ADD CONSTRAINT "EmailInbox_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EmailInbox" ADD CONSTRAINT "EmailInbox_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EmailInbox" ADD CONSTRAINT "EmailInbox_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
