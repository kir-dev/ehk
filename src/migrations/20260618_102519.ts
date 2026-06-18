import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "location_location_hu" varchar;
  ALTER TABLE "events" ADD COLUMN "location_location_en" varchar;
  ALTER TABLE "events" ADD COLUMN "image_id" integer;
  ALTER TABLE "events" ADD COLUMN "detailed_description_description_hu" jsonb;
  ALTER TABLE "events" ADD COLUMN "detailed_description_description_en" jsonb;
  ALTER TABLE "events" ADD COLUMN "facebook_url" varchar;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP CONSTRAINT "events_image_id_media_id_fk";
  
  DROP INDEX "events_image_idx";
  ALTER TABLE "events" DROP COLUMN "location_location_hu";
  ALTER TABLE "events" DROP COLUMN "location_location_en";
  ALTER TABLE "events" DROP COLUMN "image_id";
  ALTER TABLE "events" DROP COLUMN "detailed_description_description_hu";
  ALTER TABLE "events" DROP COLUMN "detailed_description_description_en";
  ALTER TABLE "events" DROP COLUMN "facebook_url";`)
}
