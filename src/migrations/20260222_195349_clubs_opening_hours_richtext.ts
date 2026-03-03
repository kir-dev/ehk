import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clubs" ADD COLUMN "opening_hours_text_hu" jsonb;
  ALTER TABLE "clubs" ADD COLUMN "opening_hours_text_en" jsonb;
  ALTER TABLE "clubs" DROP COLUMN "opening_hours";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "clubs" ADD COLUMN "opening_hours" varchar;
  ALTER TABLE "clubs" DROP COLUMN "opening_hours_text_hu";
  ALTER TABLE "clubs" DROP COLUMN "opening_hours_text_en";`)
}
