import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Short-named duplicates of former representatives, with less information than the full-named records.
const duplicates = [
  { duplicate: "Kun Levente", original: "Kun Levente Alex" },
  { duplicate: "Németh Ákos", original: "Németh Ákos Zoltán" },
  { duplicate: "Szabó Kármen", original: "Szabó Kármen Emőke" },
];

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const { duplicate, original } of duplicates) {
    await db.execute(sql`
      DELETE FROM "representatives"
      WHERE "name" = ${duplicate}
        AND EXISTS (SELECT 1 FROM "representatives" WHERE "name" = ${original});
    `);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Deleted duplicates are intentionally not restored.
}
