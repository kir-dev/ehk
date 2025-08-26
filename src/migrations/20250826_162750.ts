import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "regulations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name_hu" varchar NOT NULL,
  	"name_en" varchar NOT NULL,
  	"text_hu" jsonb NOT NULL,
  	"text_en" jsonb NOT NULL,
  	"displaytext_hu" varchar,
  	"displaytext_en" varchar,
  	"file_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "regulations_id" integer;
  ALTER TABLE "regulations" ADD CONSTRAINT "regulations_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "regulations_file_idx" ON "regulations" USING btree ("file_id");
  CREATE INDEX "regulations_updated_at_idx" ON "regulations" USING btree ("updated_at");
  CREATE INDEX "regulations_created_at_idx" ON "regulations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regulations_fk" FOREIGN KEY ("regulations_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_regulations_id_idx" ON "payload_locked_documents_rels" USING btree ("regulations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "regulations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "regulations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_regulations_fk";
  
  DROP INDEX "payload_locked_documents_rels_regulations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "regulations_id";`)
}
