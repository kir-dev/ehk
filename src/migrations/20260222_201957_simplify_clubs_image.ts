import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clubs_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "clubs_images" CASCADE;
  ALTER TABLE "clubs" ADD COLUMN "image_id" integer;
  ALTER TABLE "clubs" ADD CONSTRAINT "clubs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "clubs_image_idx" ON "clubs" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "clubs_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  ALTER TABLE "clubs" DROP CONSTRAINT "clubs_image_id_media_id_fk";
  
  DROP INDEX "clubs_image_idx";
  ALTER TABLE "clubs_images" ADD CONSTRAINT "clubs_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clubs_images" ADD CONSTRAINT "clubs_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "clubs_images_order_idx" ON "clubs_images" USING btree ("_order");
  CREATE INDEX "clubs_images_parent_id_idx" ON "clubs_images" USING btree ("_parent_id");
  CREATE INDEX "clubs_images_image_idx" ON "clubs_images" USING btree ("image_id");
  ALTER TABLE "clubs" DROP COLUMN "image_id";`)
}
