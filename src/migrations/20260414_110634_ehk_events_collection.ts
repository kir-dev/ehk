import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "ehk_events_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "ehk_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description_text_hu" jsonb NOT NULL,
  	"description_text_en" jsonb NOT NULL,
  	"order" numeric,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ehk_events_id" integer;
  ALTER TABLE "ehk_events_images" ADD CONSTRAINT "ehk_events_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ehk_events_images" ADD CONSTRAINT "ehk_events_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ehk_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ehk_events_images_order_idx" ON "ehk_events_images" USING btree ("_order");
  CREATE INDEX "ehk_events_images_parent_id_idx" ON "ehk_events_images" USING btree ("_parent_id");
  CREATE INDEX "ehk_events_images_image_idx" ON "ehk_events_images" USING btree ("image_id");
  CREATE INDEX "ehk_events_updated_at_idx" ON "ehk_events" USING btree ("updated_at");
  CREATE INDEX "ehk_events_created_at_idx" ON "ehk_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ehk_events_fk" FOREIGN KEY ("ehk_events_id") REFERENCES "public"."ehk_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ehk_events_id_idx" ON "payload_locked_documents_rels" USING btree ("ehk_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ehk_events_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ehk_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ehk_events_images" CASCADE;
  DROP TABLE "ehk_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ehk_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_ehk_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ehk_events_id";`)
}
