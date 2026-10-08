import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'representatives' AND column_name = 'resigned'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'representatives' AND column_name = 'former'
      ) THEN
        ALTER TABLE "representatives" RENAME COLUMN "resigned" TO "former";
      END IF;
    END $$;

    ALTER TABLE "representatives" ADD COLUMN IF NOT EXISTS "former" boolean DEFAULT false;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "representatives" RENAME COLUMN "former" TO "resigned";
  `);
}
