import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "regulations" ADD COLUMN IF NOT EXISTS "file_eng_id" integer;
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relkind = 'i'
          AND c.relname = 'regulations_file_eng_idx'
          AND n.nspname = 'public'
      ) THEN
        CREATE INDEX regulations_file_eng_idx ON "regulations" USING btree ("file_eng_id");
      END IF;
    END $$;
    DO $$
    BEGIN
      ALTER TABLE "regulations"
        ADD CONSTRAINT "regulations_file_eng_id_media_id_fk"
        FOREIGN KEY ("file_eng_id") REFERENCES "public"."media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "regulations" DROP CONSTRAINT IF EXISTS "regulations_file_eng_id_media_id_fk";
    END $$;
    DROP INDEX IF EXISTS "regulations_file_eng_idx";
    ALTER TABLE "regulations" DROP COLUMN IF EXISTS "file_eng_id";
  `)
}

