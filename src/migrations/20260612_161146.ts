import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "university_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_hu" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "university_pages_id" integer;
  CREATE INDEX "university_pages_updated_at_idx" ON "university_pages" USING btree ("updated_at");
  CREATE INDEX "university_pages_created_at_idx" ON "university_pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_university_pages_fk" FOREIGN KEY ("university_pages_id") REFERENCES "public"."university_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_university_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("university_pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "university_pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "university_pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_university_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_university_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "university_pages_id";`)
}
