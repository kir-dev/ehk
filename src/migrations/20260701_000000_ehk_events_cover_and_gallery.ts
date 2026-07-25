import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ehk_events_images" RENAME TO "ehk_events_gallery";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_images_pkey" TO "ehk_events_gallery_pkey";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_images_image_id_media_id_fk" TO "ehk_events_gallery_image_id_media_id_fk";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_images_parent_id_fk" TO "ehk_events_gallery_parent_id_fk";
  ALTER INDEX "ehk_events_images_order_idx" RENAME TO "ehk_events_gallery_order_idx";
  ALTER INDEX "ehk_events_images_parent_id_idx" RENAME TO "ehk_events_gallery_parent_id_idx";
  ALTER INDEX "ehk_events_images_image_idx" RENAME TO "ehk_events_gallery_image_idx";
  ALTER TABLE "ehk_events" ADD COLUMN "cover_image_id" integer;
  ALTER TABLE "ehk_events" ADD CONSTRAINT "ehk_events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "ehk_events_cover_image_idx" ON "ehk_events" USING btree ("cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ehk_events" DROP CONSTRAINT "ehk_events_cover_image_id_media_id_fk";
  DROP INDEX "ehk_events_cover_image_idx";
  ALTER TABLE "ehk_events" DROP COLUMN "cover_image_id";
  ALTER INDEX "ehk_events_gallery_order_idx" RENAME TO "ehk_events_images_order_idx";
  ALTER INDEX "ehk_events_gallery_parent_id_idx" RENAME TO "ehk_events_images_parent_id_idx";
  ALTER INDEX "ehk_events_gallery_image_idx" RENAME TO "ehk_events_images_image_idx";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_gallery_image_id_media_id_fk" TO "ehk_events_images_image_id_media_id_fk";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_gallery_parent_id_fk" TO "ehk_events_images_parent_id_fk";
  ALTER TABLE "ehk_events_gallery" RENAME CONSTRAINT "ehk_events_gallery_pkey" TO "ehk_events_images_pkey";
  ALTER TABLE "ehk_events_gallery" RENAME TO "ehk_events_images";`)
}
