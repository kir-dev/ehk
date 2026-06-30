import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "clubs_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "image_id" integer
  );
  ALTER TABLE "clubs_gallery" ADD CONSTRAINT "clubs_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clubs_gallery" ADD CONSTRAINT "clubs_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "clubs_gallery_order_idx" ON "clubs_gallery" USING btree ("_order");
  CREATE INDEX "clubs_gallery_parent_id_idx" ON "clubs_gallery" USING btree ("_parent_id");
  CREATE INDEX "clubs_gallery_image_idx" ON "clubs_gallery" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clubs_gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "clubs_gallery" CASCADE;`)
}
