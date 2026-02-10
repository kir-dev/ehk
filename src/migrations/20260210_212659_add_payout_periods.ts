import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payout_periods_autumn_semester_payouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"month" varchar NOT NULL,
  	"date" varchar NOT NULL
  );
  
  CREATE TABLE "payout_periods_spring_semester_payouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"month" varchar NOT NULL,
  	"date" varchar NOT NULL
  );
  
  CREATE TABLE "payout_periods" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payout_periods_id" integer;
  ALTER TABLE "payout_periods_autumn_semester_payouts" ADD CONSTRAINT "payout_periods_autumn_semester_payouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payout_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payout_periods_spring_semester_payouts" ADD CONSTRAINT "payout_periods_spring_semester_payouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payout_periods"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payout_periods_autumn_semester_payouts_order_idx" ON "payout_periods_autumn_semester_payouts" USING btree ("_order");
  CREATE INDEX "payout_periods_autumn_semester_payouts_parent_id_idx" ON "payout_periods_autumn_semester_payouts" USING btree ("_parent_id");
  CREATE INDEX "payout_periods_spring_semester_payouts_order_idx" ON "payout_periods_spring_semester_payouts" USING btree ("_order");
  CREATE INDEX "payout_periods_spring_semester_payouts_parent_id_idx" ON "payout_periods_spring_semester_payouts" USING btree ("_parent_id");
  CREATE INDEX "payout_periods_updated_at_idx" ON "payout_periods" USING btree ("updated_at");
  CREATE INDEX "payout_periods_created_at_idx" ON "payout_periods" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payout_periods_fk" FOREIGN KEY ("payout_periods_id") REFERENCES "public"."payout_periods"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_payout_periods_id_idx" ON "payload_locked_documents_rels" USING btree ("payout_periods_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payout_periods_autumn_semester_payouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payout_periods_spring_semester_payouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payout_periods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payout_periods_autumn_semester_payouts" CASCADE;
  DROP TABLE "payout_periods_spring_semester_payouts" CASCADE;
  DROP TABLE "payout_periods" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payout_periods_fk";
  
  DROP INDEX "payload_locked_documents_rels_payout_periods_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payout_periods_id";`)
}
