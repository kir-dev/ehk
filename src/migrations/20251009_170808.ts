import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$
   BEGIN
     CREATE TYPE "public"."enum_regulations_type" AS ENUM('academic', 'benefits', 'dormitory');
   EXCEPTION
     WHEN duplicate_object THEN NULL;
   END $$;
   ALTER TABLE "regulations" ADD COLUMN IF NOT EXISTS "type" "public"."enum_regulations_type";
   UPDATE "regulations" SET "type" = 'academic' WHERE "type" IS NULL;
   ALTER TABLE "regulations" ALTER COLUMN "type" SET NOT NULL;`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "regulations" DROP COLUMN "type";
  DROP TYPE "public"."enum_regulations_type";`)
}
