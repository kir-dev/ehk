import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "permissions" ADD COLUMN "submissionprocess_hu" jsonb;
  ALTER TABLE "permissions" ADD COLUMN "submissionprocess_en" jsonb;
  ALTER TABLE "permissions" ADD COLUMN "external_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "permissions" DROP COLUMN "submissionprocess_hu";
  ALTER TABLE "permissions" DROP COLUMN "submissionprocess_en";
  ALTER TABLE "permissions" DROP COLUMN "external_link";`)
}
