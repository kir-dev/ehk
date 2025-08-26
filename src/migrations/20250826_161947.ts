import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "permissions" ALTER COLUMN "displaytext_hu" DROP NOT NULL;
  ALTER TABLE "permissions" ALTER COLUMN "displaytext_en" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "permissions" ALTER COLUMN "displaytext_hu" SET NOT NULL;
  ALTER TABLE "permissions" ALTER COLUMN "displaytext_en" SET NOT NULL;`)
}
