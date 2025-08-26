// typescript
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Convert varchar -> jsonb safely
    ALTER TABLE "permissions"
      ALTER COLUMN "text_hu" SET DATA TYPE jsonb USING to_jsonb("text_hu"),
    ALTER COLUMN "text_en" SET DATA TYPE jsonb USING to_jsonb("text_en"),
      ALTER COLUMN "file_id" DROP NOT NULL;

    -- Add new columns (nullable first)
    ALTER TABLE "permissions"
      ADD COLUMN IF NOT EXISTS "name_hu" varchar,
      ADD COLUMN IF NOT EXISTS "name_en" varchar,
      ADD COLUMN IF NOT EXISTS "displaytext_hu" varchar,
      ADD COLUMN IF NOT EXISTS "displaytext_en" varchar;

    -- Backfill from old columns if they exist
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'permissions' AND column_name = 'name'
      ) THEN
        EXECUTE 'UPDATE "permissions"
                 SET "name_hu" = COALESCE("name_hu", "name"),
                     "name_en" = COALESCE("name_en", "name")';
    END IF;
    END $$;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'permissions' AND column_name = 'display_text'
      ) THEN
        EXECUTE 'UPDATE "permissions"
                 SET "displaytext_hu" = COALESCE("displaytext_hu", "display_text"),
                     "displaytext_en" = COALESCE("displaytext_en", "display_text")';
    END IF;
    END $$;

    -- Ensure no NULLs before enforcing NOT NULL
    UPDATE "permissions" SET "name_hu" = '' WHERE "name_hu" IS NULL;
    UPDATE "permissions" SET "name_en" = '' WHERE "name_en" IS NULL;
    UPDATE "permissions" SET "displaytext_hu" = '' WHERE "displaytext_hu" IS NULL;
    UPDATE "permissions" SET "displaytext_en" = '' WHERE "displaytext_en" IS NULL;

    -- Enforce NOT NULL
    ALTER TABLE "permissions"
      ALTER COLUMN "name_hu" SET NOT NULL,
    ALTER COLUMN "name_en" SET NOT NULL,
      ALTER COLUMN "displaytext_hu" SET NOT NULL,
      ALTER COLUMN "displaytext_en" SET NOT NULL;

    -- Drop old columns only if they exist
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'permissions' AND column_name = 'name'
      ) THEN
        EXECUTE 'ALTER TABLE "permissions" DROP COLUMN "name"';
    END IF;
    END $$;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'permissions' AND column_name = 'display_text'
      ) THEN
        EXECUTE 'ALTER TABLE "permissions" DROP COLUMN "display_text"';
    END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Recreate old columns
    ALTER TABLE "permissions"
      ADD COLUMN IF NOT EXISTS "name" varchar,
      ADD COLUMN IF NOT EXISTS "display_text" varchar;

    -- Backfill from new columns if present
    UPDATE "permissions"
    SET
      "name" = COALESCE("name", COALESCE("name_hu", "name_en")),
      "display_text" = COALESCE("display_text", COALESCE("displaytext_hu", "displaytext_en"));

    -- Enforce NOT NULL on old columns
    UPDATE "permissions" SET "name" = '' WHERE "name" IS NULL;
    UPDATE "permissions" SET "display_text" = '' WHERE "display_text" IS NULL;
    ALTER TABLE "permissions"
      ALTER COLUMN "name" SET NOT NULL,
    ALTER COLUMN "display_text" SET NOT NULL;

    -- Revert jsonb -> varchar
    ALTER TABLE "permissions"
      ALTER COLUMN "text_hu" SET DATA TYPE varchar USING "text_hu"::text,
    ALTER COLUMN "text_en" SET DATA TYPE varchar USING "text_en"::text,
      ALTER COLUMN "file_id" SET NOT NULL;

    -- Drop new columns
    ALTER TABLE "permissions"
    DROP COLUMN IF EXISTS "name_hu",
      DROP COLUMN IF EXISTS "name_en",
      DROP COLUMN IF EXISTS "displaytext_hu",
      DROP COLUMN IF EXISTS "displaytext_en";
  `)
}