import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payout_periods_autumn_semester_payouts" RENAME COLUMN "month" TO "month_hu";
  ALTER TABLE "payout_periods_spring_semester_payouts" RENAME COLUMN "month" TO "month_hu";
  ALTER TABLE "payout_periods_autumn_semester_payouts" ADD COLUMN "month_en" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "payout_periods_spring_semester_payouts" ADD COLUMN "month_en" varchar DEFAULT '' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payout_periods_autumn_semester_payouts" ADD COLUMN "month" varchar NOT NULL;
  ALTER TABLE "payout_periods_spring_semester_payouts" ADD COLUMN "month" varchar NOT NULL;
  ALTER TABLE "payout_periods_autumn_semester_payouts" DROP COLUMN "month_hu";
  ALTER TABLE "payout_periods_autumn_semester_payouts" DROP COLUMN "month_en";
  ALTER TABLE "payout_periods_spring_semester_payouts" DROP COLUMN "month_hu";
  ALTER TABLE "payout_periods_spring_semester_payouts" DROP COLUMN "month_en";`)
}
