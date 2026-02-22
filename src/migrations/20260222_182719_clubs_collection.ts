import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "clubs_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "clubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description_text_hu" jsonb NOT NULL,
  	"description_text_en" jsonb NOT NULL,
  	"location" varchar,
  	"opening_hours" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clubs_id" integer;
  ALTER TABLE "clubs_images" ADD CONSTRAINT "clubs_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clubs_images" ADD CONSTRAINT "clubs_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "clubs_images_order_idx" ON "clubs_images" USING btree ("_order");
  CREATE INDEX "clubs_images_parent_id_idx" ON "clubs_images" USING btree ("_parent_id");
  CREATE INDEX "clubs_images_image_idx" ON "clubs_images" USING btree ("image_id");
  CREATE INDEX "clubs_updated_at_idx" ON "clubs" USING btree ("updated_at");
  CREATE INDEX "clubs_created_at_idx" ON "clubs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_clubs_id_idx" ON "payload_locked_documents_rels" USING btree ("clubs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clubs_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clubs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "clubs_images" CASCADE;
  DROP TABLE "clubs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clubs_fk";
  
  DROP INDEX "payload_locked_documents_rels_clubs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "clubs_id";`)
}
