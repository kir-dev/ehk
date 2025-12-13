import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "help_files" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "displayname_hu" varchar NOT NULL,
      "file_hu_id" integer NOT NULL,
      "displayname_en" varchar,
      "file_en_id" integer
    );

    CREATE TABLE "help" (
      "id" serial PRIMARY KEY NOT NULL,
      "title_hu" varchar NOT NULL,
      "title_en" varchar NOT NULL,
      "description_hu" varchar NOT NULL,
      "description_en" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "help_id" integer;
    ALTER TABLE "help_files" ADD CONSTRAINT "help_files_file_hu_id_media_id_fk" FOREIGN KEY ("file_hu_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "help_files" ADD CONSTRAINT "help_files_file_en_id_media_id_fk" FOREIGN KEY ("file_en_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "help_files" ADD CONSTRAINT "help_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "help_files_order_idx" ON "help_files" USING btree ("_order");
    CREATE INDEX "help_files_parent_id_idx" ON "help_files" USING btree ("_parent_id");
    CREATE INDEX "help_files_file_hu_idx" ON "help_files" USING btree ("file_hu_id");
    CREATE INDEX "help_files_file_en_idx" ON "help_files" USING btree ("file_en_id");
    CREATE INDEX "help_updated_at_idx" ON "help" USING btree ("updated_at");
    CREATE INDEX "help_created_at_idx" ON "help" USING btree ("created_at");
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_help_fk" FOREIGN KEY ("help_id") REFERENCES "public"."help"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "payload_locked_documents_rels_help_id_idx" ON "payload_locked_documents_rels" USING btree ("help_id");
  `);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "help_files" CASCADE;
    DROP TABLE "help" CASCADE;
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_help_fk";
    DROP INDEX "payload_locked_documents_rels_help_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "help_id";
  `);
}
