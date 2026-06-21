import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ADD COLUMN "representative_id" integer;
  ALTER TABLE "news" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "news" ADD CONSTRAINT "news_representative_id_representatives_id_fk" FOREIGN KEY ("representative_id") REFERENCES "public"."representatives"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "news_representative_idx" ON "news" USING btree ("representative_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" DROP CONSTRAINT "news_representative_id_representatives_id_fk";
  
  DROP INDEX "news_representative_idx";
  ALTER TABLE "news" DROP COLUMN "representative_id";
  ALTER TABLE "news" DROP COLUMN "contact_email";`)
}
