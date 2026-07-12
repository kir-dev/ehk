import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "dormitories" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "cover_image_id" integer NOT NULL,
    "external_link" varchar,
    "order" numeric DEFAULT 0 NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dormitories_id" integer;
  ALTER TABLE "dormitories" ADD CONSTRAINT "dormitories_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dormitories_fk" FOREIGN KEY ("dormitories_id") REFERENCES "public"."dormitories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "dormitories_slug_idx" ON "dormitories" USING btree ("slug");
  CREATE INDEX "dormitories_cover_image_idx" ON "dormitories" USING btree ("cover_image_id");
  CREATE INDEX "dormitories_order_idx" ON "dormitories" USING btree ("order");
  CREATE INDEX "dormitories_updated_at_idx" ON "dormitories" USING btree ("updated_at");
  CREATE INDEX "dormitories_created_at_idx" ON "dormitories" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_dormitories_id_idx" ON "payload_locked_documents_rels" USING btree ("dormitories_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dormitories_fk";
  ALTER TABLE "dormitories" DROP CONSTRAINT "dormitories_cover_image_id_media_id_fk";
  DROP INDEX "payload_locked_documents_rels_dormitories_id_idx";
  DROP INDEX "dormitories_created_at_idx";
  DROP INDEX "dormitories_updated_at_idx";
  DROP INDEX "dormitories_order_idx";
  DROP INDEX "dormitories_cover_image_idx";
  DROP INDEX "dormitories_slug_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dormitories_id";
  ALTER TABLE "dormitories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dormitories" CASCADE;`);
}
