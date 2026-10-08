import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The "Volt képviselők" list of the old website (ehk-regi.kir-dev.hu/szervezet/h), in its original order.
const formerRepresentatives = [
  "Lévai Imre",
  "Rajtik Dóra Vivien (VIK)",
  "Varga Kitti (ÉMK)",
  "Langár Ákos István (GTK)",
  "Miokovics Patrik (KJK)",
  "Papp Bercel (GPK)",
  "Kovács Laura (ÉPK)",
  "Horváth Adrián Márk (VIK)",
  "Veliczky Zsófia (ÉPK)",
  "Márton Ágnes (VBK)",
  "Dreiszig Dániel (KJK)",
  "Nyilas Zoltán (GPK)",
  "Rajczi Barnabás (VIK)",
  "Hegyes József (VIK)",
  "Kovács Brúnó Aurél (TTK)",
  "Smuk András (VIK)",
  "Csaplár Miklós Máté (TTK)",
  "Lengyel Zsolt (KJK)",
  "Baranyai Dóra Eszter (ÉMK)",
  "Radácsi Kristóf",
  "Zöllner Lili (VBK)",
  "Vámosi Anna (KJK)",
  "Antal Jázmin (ÉPK)",
  "Kovács Kíra Diána (TTK)",
  "Vigyikán Vince (ÉPK)",
  "Kékesi Márton Gábor (ÉMK)",
  "Szatzger Martin (KJK)",
  "Pusztay Botond (GTK)",
  "Nagy Levente (VIK)",
  "Sajtos Judit (TTK)",
  "Lukács Bálint (GPK)",
  "Koronczai Fanni (ÉPK)",
  "Bódig Péter (GTK)",
  "Nagy Ynna Ilona (TTK)",
  "Gombás Bálint (KJK)",
  "Kiss Mirjam Cecília (VBK)",
  "Felföldi Árpád (ÉMK)",
  "Lénárt Adél Lujza (VBK)",
  "Koltai Kristóf (TTK)",
  "Béres Máté (KJK)",
  "Papp Bendegúz (ÉMK)",
  "Varga Viktor (GTK)",
  "Bátori Boglárka (ÉMK)",
  "Lipták Bence (GTK)",
  "Tani Zoltán (VBK)",
  "Szili Ákos",
  "Szabó Dániel (ÉPK)",
  "Takács Dalma (VIK)",
  "Merkei Dóra (GTK)",
  "Szabó Kármen Emőke (VBK)",
  "Németh Csongor Gergely (VBK)",
  "Csábi Eszter Zsófia (VIK)",
  "Zoller Zita (TTK)",
  "Magyar Boglárka (TTK)",
  "Szalay Luca (VBK)",
  "Walton Mihály (ÉPK)",
  "Józsa Alex (KJK)",
  "Dovicsin Péter (KJK)",
  "Varga Balázs (VIK)",
  "Kocsi József (KJK)",
  "Pecze Levente (GTK)",
  "Dáni Eszter (TTK)",
  "Vuics Márton (VBK)",
  "Szenka József (GPK)",
  "Grizák Máté (KJK)",
  "Puskely Gergő (ÉMK)",
].map((entry) => {
  const match = entry.match(/^(.*?)\s*\((ÉMK|GPK|ÉPK|VBK|VIK|GTK|TTK|KJK)\)$/);
  return {
    name: (match?.[1] ?? entry).trim(),
    faculty: match?.[2] ?? null,
  };
});

// Former representatives are listed by name only, so they get an empty introduction.
const emptyRichText = JSON.stringify({
  root: {
    type: "root",
    children: [],
    direction: null,
    format: "",
    indent: 0,
    version: 1,
  },
});

// Keep them after the active representatives, in the order of the old website.
const ORDER_OFFSET = 1000;

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [index, representative] of formerRepresentatives.entries()) {
    await db.execute(sql`
      WITH updated AS (
        UPDATE "representatives"
        SET "former" = true
        WHERE "name" = ${representative.name}
        RETURNING "id"
      )
      INSERT INTO "representatives" (
        "name",
        "faculty",
        "introduction_text_hu",
        "introduction_text_en",
        "former",
        "order"
      )
      SELECT
        ${representative.name},
        ${representative.faculty}::enum_representatives_faculty,
        ${emptyRichText}::jsonb,
        ${emptyRichText}::jsonb,
        true,
        ${ORDER_OFFSET + index}
      WHERE NOT EXISTS (SELECT 1 FROM updated);
    `);
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Only remove the entries this migration created: former, without picture and introduction.
  for (const representative of formerRepresentatives) {
    await db.execute(sql`
      DELETE FROM "representatives"
      WHERE "name" = ${representative.name}
        AND "former" = true
        AND "picture_id" IS NULL
        AND "introduction_text_hu" = ${emptyRichText}::jsonb;
    `);
  }
}
