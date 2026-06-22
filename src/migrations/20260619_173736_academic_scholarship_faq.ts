import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "academic_scholarship_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_hu" varchar NOT NULL,
  	"header_en" varchar NOT NULL,
  	"content_hu" jsonb NOT NULL,
  	"content_en" jsonb NOT NULL
  );
  
  CREATE TABLE "academic_scholarship_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "academic_scholarship_faq_accordion_items" ADD CONSTRAINT "academic_scholarship_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."academic_scholarship_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "academic_scholarship_faq_accordion_items_order_idx" ON "academic_scholarship_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "academic_scholarship_faq_accordion_items_parent_id_idx" ON "academic_scholarship_faq_accordion_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "academic_scholarship_faq_accordion_items" CASCADE;
  DROP TABLE "academic_scholarship_faq" CASCADE;`)
}
