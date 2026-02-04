-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('OWNER', 'ADMIN', 'TUTOR');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BUSINESS_LOGO', 'BUSINESS_ICON', 'PRODUCT', 'PROFILE', 'GENERAL', 'BANNER', 'PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('CLASS', 'WORKSHOP', 'CAMP');

-- CreateEnum
CREATE TYPE "LeadStage" AS ENUM ('NEW', 'CONTACT_ATTEMPTED', 'CONTACTED', 'FOLLOW_UP_ATTEMPTED', 'FOLLOWED_UP', 'COMMITTED', 'SCHEDULED', 'ASSESSED', 'ACTIVE', 'COLD');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('WEB', 'WALK_IN', 'PHONE', 'EMAIL', 'SOCIAL');

-- CreateEnum
CREATE TYPE "LeadTemperature" AS ENUM ('HOT', 'WARM', 'COLD');

-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('PHONE', 'EMAIL', 'DM');

-- CreateEnum
CREATE TYPE "RecurrenceType" AS ENUM ('AD_HOC', 'WEEKLY', 'DAILY');

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_phone" TEXT,
    "business_email" TEXT,
    "timezone" TEXT NOT NULL,
    "default_buffer_minutes" INTEGER NOT NULL,
    "owner_user_id" UUID,
    "business_address_1" TEXT,
    "business_address_2" TEXT,
    "business_city" TEXT,
    "business_state" TEXT,
    "business_zip" TEXT,
    "palette_color_1" TEXT,
    "palette_color_2" TEXT,
    "palette_color_3" TEXT,
    "palette_color_4" TEXT,
    "palette_color_5" TEXT,
    "layout_key" TEXT,
    "website_slug" TEXT,
    "headline_text" TEXT,
    "about_text" TEXT,
    "mission_text" TEXT,
    "tutoring_style_text" TEXT,
    "testimonials_text" TEXT,
    "privacy_policy_text" TEXT,
    "cta_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "location_name" TEXT NOT NULL,
    "is_virtual" BOOLEAN NOT NULL DEFAULT false,
    "location_address_1" TEXT,
    "location_address_2" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_zip" TEXT,
    "location_phone" TEXT,
    "location_email" TEXT,
    "location_manager_first_name" TEXT,
    "location_manager_last_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationHours" (
    "id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "open_time" TEXT,
    "close_time" TEXT,

    CONSTRAINT "LocationHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "room_name" TEXT NOT NULL,
    "room_number" TEXT,
    "floor_number" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_description" TEXT,
    "image_type" "ImageType" NOT NULL,
    "image_alt_text" TEXT,
    "image_caption" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "address_1" TEXT,
    "address_2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" UUID NOT NULL,
    "role" "UserRoleType" NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role")
);

-- CreateTable
CREATE TABLE "UserLocation" (
    "user_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("user_id","location_id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bio_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorLocation" (
    "tutor_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "TutorLocation_pkey" PRIMARY KEY ("tutor_id","location_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" UUID NOT NULL,
    "subject_name" TEXT NOT NULL,
    "sort_order" INTEGER,
    "organization_id" UUID,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "topic_name" TEXT NOT NULL,
    "sort_order" INTEGER,
    "organization_id" UUID,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOffered" (
    "id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "service_code" TEXT NOT NULL,
    "hourly_rate_cents" INTEGER NOT NULL,
    "display_name" TEXT,
    "description_text" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceOffered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "product_type" "ProductType" NOT NULL,
    "product_name" TEXT NOT NULL,
    "subject_id" UUID,
    "topic_id" UUID,
    "service_code" TEXT,
    "product_description_text" TEXT,
    "product_syllabus_text" TEXT,
    "languages_offered" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "stage" "LeadStage" NOT NULL DEFAULT 'NEW',
    "lead_location_id" UUID,
    "source" "LeadSource",
    "owner_user_id" UUID,
    "temperature" "LeadTemperature",
    "last_contact_method" "ContactMethod",
    "last_contact_at" TIMESTAMP(3),
    "reason_lost" TEXT,
    "parent_first_name" TEXT,
    "parent_last_name" TEXT,
    "parent_address_1" TEXT,
    "parent_address_2" TEXT,
    "parent_city" TEXT,
    "parent_state" TEXT,
    "parent_zip" TEXT,
    "parent_email" TEXT,
    "parent_phone" TEXT,
    "notes" TEXT,
    "subject_id" UUID,
    "topic_id" UUID,
    "converted_parent_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "parent1_first_name" TEXT,
    "parent1_last_name" TEXT,
    "parent1_address_1" TEXT,
    "parent1_address_2" TEXT,
    "parent1_city" TEXT,
    "parent1_state" TEXT,
    "parent1_zip" TEXT,
    "parent1_email" TEXT,
    "parent1_phone" TEXT,
    "parent2_first_name" TEXT,
    "parent2_last_name" TEXT,
    "parent2_address_1" TEXT,
    "parent2_address_2" TEXT,
    "parent2_city" TEXT,
    "parent2_state" TEXT,
    "parent2_zip" TEXT,
    "parent2_email" TEXT,
    "parent2_phone" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "dob" TIMESTAMP(3),
    "school" TEXT,
    "iep" BOOLEAN DEFAULT false,
    "allergies" BOOLEAN DEFAULT false,
    "medical_condition" BOOLEAN DEFAULT false,
    "behaviorial_issue" BOOLEAN DEFAULT false,
    "vision_ok" BOOLEAN DEFAULT true,
    "hearing_ok" BOOLEAN DEFAULT true,
    "in_person" BOOLEAN DEFAULT true,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSubject" (
    "student_id" UUID NOT NULL,
    "rank" INTEGER NOT NULL,
    "subject_id" UUID NOT NULL,
    "topic_id" UUID,

    CONSTRAINT "StudentSubject_pkey" PRIMARY KEY ("student_id","rank")
);

-- CreateTable
CREATE TABLE "ScheduleEntry" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "service_offered_id" UUID NOT NULL,
    "tutor_id" UUID NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "product_id" UUID,
    "subject_id" UUID,
    "topic_id" UUID,
    "series_id" TEXT,
    "recurrence_interval" INTEGER,
    "recurrence_days_of_week" TEXT,
    "series_end_date" TIMESTAMP(3),
    "occurrence_count" INTEGER,
    "duration_minutes" INTEGER NOT NULL,
    "include_buffer" BOOLEAN NOT NULL DEFAULT false,
    "end_at" TIMESTAMP(3) NOT NULL,
    "blocked_end_at" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "recurrence_type" "RecurrenceType" NOT NULL DEFAULT 'AD_HOC',
    "hourly_rate_cents_snapshot" INTEGER NOT NULL,
    "resources_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "ScheduleEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleEntryRoom" (
    "schedule_entry_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,

    CONSTRAINT "ScheduleEntryRoom_pkey" PRIMARY KEY ("schedule_entry_id","room_id")
);

-- CreateTable
CREATE TABLE "ScheduleEntryAttendee" (
    "schedule_entry_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,

    CONSTRAINT "ScheduleEntryAttendee_pkey" PRIMARY KEY ("schedule_entry_id","student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_owner_user_id_key" ON "Organization"("owner_user_id");

-- CreateIndex
CREATE INDEX "Organization_archived_at_idx" ON "Organization"("archived_at");

-- CreateIndex
CREATE INDEX "Location_organization_id_idx" ON "Location"("organization_id");

-- CreateIndex
CREATE INDEX "Location_archived_at_idx" ON "Location"("archived_at");

-- CreateIndex
CREATE INDEX "LocationHours_location_id_idx" ON "LocationHours"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "LocationHours_location_id_day_of_week_key" ON "LocationHours"("location_id", "day_of_week");

-- CreateIndex
CREATE INDEX "Room_location_id_idx" ON "Room"("location_id");

-- CreateIndex
CREATE INDEX "Room_room_name_idx" ON "Room"("room_name");

-- CreateIndex
CREATE INDEX "Image_organization_id_idx" ON "Image"("organization_id");

-- CreateIndex
CREATE INDEX "Image_image_type_idx" ON "Image"("image_type");

-- CreateIndex
CREATE INDEX "Image_archived_at_idx" ON "Image"("archived_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_organization_id_idx" ON "User"("organization_id");

-- CreateIndex
CREATE INDEX "User_archived_at_idx" ON "User"("archived_at");

-- CreateIndex
CREATE INDEX "UserLocation_location_id_idx" ON "UserLocation"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_user_id_key" ON "Tutor"("user_id");

-- CreateIndex
CREATE INDEX "Tutor_organization_id_idx" ON "Tutor"("organization_id");

-- CreateIndex
CREATE INDEX "Tutor_archived_at_idx" ON "Tutor"("archived_at");

-- CreateIndex
CREATE INDEX "TutorLocation_location_id_idx" ON "TutorLocation"("location_id");

-- CreateIndex
CREATE INDEX "Subject_organization_id_idx" ON "Subject"("organization_id");

-- CreateIndex
CREATE INDEX "Subject_subject_name_idx" ON "Subject"("subject_name");

-- CreateIndex
CREATE INDEX "Topic_subject_id_idx" ON "Topic"("subject_id");

-- CreateIndex
CREATE INDEX "Topic_organization_id_idx" ON "Topic"("organization_id");

-- CreateIndex
CREATE INDEX "Topic_topic_name_idx" ON "Topic"("topic_name");

-- CreateIndex
CREATE INDEX "ServiceOffered_location_id_idx" ON "ServiceOffered"("location_id");

-- CreateIndex
CREATE INDEX "ServiceOffered_service_code_idx" ON "ServiceOffered"("service_code");

-- CreateIndex
CREATE INDEX "Product_organization_id_idx" ON "Product"("organization_id");

-- CreateIndex
CREATE INDEX "Product_product_type_idx" ON "Product"("product_type");

-- CreateIndex
CREATE INDEX "Product_product_name_idx" ON "Product"("product_name");

-- CreateIndex
CREATE INDEX "Lead_organization_id_idx" ON "Lead"("organization_id");

-- CreateIndex
CREATE INDEX "Lead_stage_idx" ON "Lead"("stage");

-- CreateIndex
CREATE INDEX "Lead_lead_location_id_idx" ON "Lead"("lead_location_id");

-- CreateIndex
CREATE INDEX "Lead_owner_user_id_idx" ON "Lead"("owner_user_id");

-- CreateIndex
CREATE INDEX "Lead_archived_at_idx" ON "Lead"("archived_at");

-- CreateIndex
CREATE INDEX "Parent_organization_id_idx" ON "Parent"("organization_id");

-- CreateIndex
CREATE INDEX "Parent_archived_at_idx" ON "Parent"("archived_at");

-- CreateIndex
CREATE INDEX "Student_organization_id_idx" ON "Student"("organization_id");

-- CreateIndex
CREATE INDEX "Student_parent_id_idx" ON "Student"("parent_id");

-- CreateIndex
CREATE INDEX "Student_location_id_idx" ON "Student"("location_id");

-- CreateIndex
CREATE INDEX "Student_archived_at_idx" ON "Student"("archived_at");

-- CreateIndex
CREATE INDEX "StudentSubject_subject_id_idx" ON "StudentSubject"("subject_id");

-- CreateIndex
CREATE INDEX "StudentSubject_topic_id_idx" ON "StudentSubject"("topic_id");

-- CreateIndex
CREATE INDEX "ScheduleEntry_organization_id_idx" ON "ScheduleEntry"("organization_id");

-- CreateIndex
CREATE INDEX "ScheduleEntry_location_id_idx" ON "ScheduleEntry"("location_id");

-- CreateIndex
CREATE INDEX "ScheduleEntry_tutor_id_idx" ON "ScheduleEntry"("tutor_id");

-- CreateIndex
CREATE INDEX "ScheduleEntry_service_offered_id_idx" ON "ScheduleEntry"("service_offered_id");

-- CreateIndex
CREATE INDEX "ScheduleEntry_start_at_idx" ON "ScheduleEntry"("start_at");

-- CreateIndex
CREATE INDEX "ScheduleEntry_archived_at_idx" ON "ScheduleEntry"("archived_at");

-- CreateIndex
CREATE INDEX "ScheduleEntry_series_id_idx" ON "ScheduleEntry"("series_id");

-- CreateIndex
CREATE INDEX "ScheduleEntryRoom_room_id_idx" ON "ScheduleEntryRoom"("room_id");

-- CreateIndex
CREATE INDEX "ScheduleEntryAttendee_student_id_idx" ON "ScheduleEntryAttendee"("student_id");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationHours" ADD CONSTRAINT "LocationHours_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorLocation" ADD CONSTRAINT "TutorLocation_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorLocation" ADD CONSTRAINT "TutorLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOffered" ADD CONSTRAINT "ServiceOffered_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_lead_location_id_fkey" FOREIGN KEY ("lead_location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_converted_parent_id_fkey" FOREIGN KEY ("converted_parent_id") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_service_offered_id_fkey" FOREIGN KEY ("service_offered_id") REFERENCES "ServiceOffered"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntryRoom" ADD CONSTRAINT "ScheduleEntryRoom_schedule_entry_id_fkey" FOREIGN KEY ("schedule_entry_id") REFERENCES "ScheduleEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntryRoom" ADD CONSTRAINT "ScheduleEntryRoom_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntryAttendee" ADD CONSTRAINT "ScheduleEntryAttendee_schedule_entry_id_fkey" FOREIGN KEY ("schedule_entry_id") REFERENCES "ScheduleEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntryAttendee" ADD CONSTRAINT "ScheduleEntryAttendee_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
