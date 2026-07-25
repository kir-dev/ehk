import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "description_hu" jsonb;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "description_en" jsonb;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "capacity" numeric;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "address_hu" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "address_en" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "map_url" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "room_info_hu" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "room_info_en" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "target_audience_hu" varchar;
  ALTER TABLE "dormitories" ADD COLUMN IF NOT EXISTS "target_audience_en" varchar;

  CREATE TABLE IF NOT EXISTS "dormitories_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "category_name_hu" varchar NOT NULL,
    "category_name_en" varchar
  );

  CREATE TABLE IF NOT EXISTS "dormitories_gallery_images" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "image_id" integer NOT NULL
  );

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'dormitories_gallery_parent_id_fk') THEN
      ALTER TABLE "dormitories_gallery" ADD CONSTRAINT "dormitories_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dormitories"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'dormitories_gallery_images_parent_id_fk') THEN
      ALTER TABLE "dormitories_gallery_images" ADD CONSTRAINT "dormitories_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dormitories_gallery"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'dormitories_gallery_images_image_id_media_id_fk') THEN
      ALTER TABLE "dormitories_gallery_images" ADD CONSTRAINT "dormitories_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "dormitories_gallery_order_idx" ON "dormitories_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "dormitories_gallery_parent_id_idx" ON "dormitories_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_order_idx" ON "dormitories_gallery_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_parent_id_idx" ON "dormitories_gallery_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_image_idx" ON "dormitories_gallery_images" USING btree ("image_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE IF EXISTS "dormitories_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "dormitories_gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "dormitories_gallery_images" CASCADE;
  DROP TABLE IF EXISTS "dormitories_gallery" CASCADE;

  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "target_audience_en";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "target_audience_hu";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "room_info_en";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "room_info_hu";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "map_url";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "address_en";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "address_hu";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "capacity";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "description_en";
  ALTER TABLE "dormitories" DROP COLUMN IF EXISTS "description_hu";`);
}
