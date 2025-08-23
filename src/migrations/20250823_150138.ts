import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "decisions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_hu" varchar NOT NULL,
  	"text_en" varchar NOT NULL,
  	"display_text" varchar NOT NULL,
  	"file_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "decisions_id" integer;
  ALTER TABLE "decisions" ADD CONSTRAINT "decisions_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "decisions_file_idx" ON "decisions" USING btree ("file_id");
  CREATE INDEX "decisions_updated_at_idx" ON "decisions" USING btree ("updated_at");
  CREATE INDEX "decisions_created_at_idx" ON "decisions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_decisions_id_idx" ON "payload_locked_documents_rels" USING btree ("decisions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "decisions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "decisions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_decisions_fk";
  
  DROP INDEX "payload_locked_documents_rels_decisions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "decisions_id";`)
}
