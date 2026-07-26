import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

const correctUrl = "https://frtbme.hu/";
const previousUrl = "https://mvk.bme.hu";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "competitive_teams"
    SET
      "contacts_website_url" = ${correctUrl},
      "join_url" = ${correctUrl}
    WHERE "name" = 'BME Formula Racing Team';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "competitive_teams"
    SET
      "contacts_website_url" = ${previousUrl},
      "join_url" = ${previousUrl}
    WHERE "name" = 'BME Formula Racing Team';
  `);
}
