// typescript
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "permissions" (
                                               "id" serial PRIMARY KEY NOT NULL,
                                               "name" varchar NOT NULL,
                                               "text_hu" varchar NOT NULL,
                                               "text_en" varchar NOT NULL,
                                               "display_text" varchar NOT NULL,
                                               "file_id" integer NOT NULL,
                                               "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "permissions_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'permissions_file_id_media_id_fk'
      ) THEN
    ALTER TABLE "permissions"
      ADD CONSTRAINT "permissions_file_id_media_id_fk"
        FOREIGN KEY ("file_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
    END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_permissions_fk'
      ) THEN
    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_permissions_fk"
        FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id")
          ON DELETE cascade ON UPDATE no action;
    END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "permissions_file_idx" ON "permissions" USING btree ("file_id");
    CREATE INDEX IF NOT EXISTS "permissions_updated_at_idx" ON "permissions" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "permissions_created_at_idx" ON "permissions" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_permissions_id_idx" ON "payload_locked_documents_rels" USING btree ("permissions_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_permissions_fk'
      ) THEN
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_permissions_fk";
    END IF;
    END $$;

    DROP INDEX IF EXISTS "payload_locked_documents_rels_permissions_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "permissions_id";

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'permissions_file_id_media_id_fk'
      ) THEN
    ALTER TABLE "permissions" DROP CONSTRAINT "permissions_file_id_media_id_fk";
    END IF;
    END $$;

    DROP INDEX IF EXISTS "permissions_file_idx";
    DROP INDEX IF EXISTS "permissions_updated_at_idx";
    DROP INDEX IF EXISTS "permissions_created_at_idx";

    DROP TABLE IF EXISTS "permissions" CASCADE;
  `)
}