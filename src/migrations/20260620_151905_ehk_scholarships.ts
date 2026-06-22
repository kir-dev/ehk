import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

type LexicalNode = {
  type: string;
  version: number;
  [key: string]: unknown;
};

const textNode = (text: string): LexicalNode => ({
  type: "text",
  text,
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const paragraph = (text: string): LexicalNode => ({
  type: "paragraph",
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  version: 1,
  children: [textNode(text)],
});

const doc = (text: string) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: [paragraph(text)],
  },
});

const scholarships = [
  {
    title_hu: "Egyetemi Hallgatói Képviselet ösztöndíj",
    title_en: "University Student Union Scholarship",
    content_hu:
      "Az Egyetemi Hallgatói Képviselet tagjai a BME Hallgatói és Doktorandusz Önkormányzat Alapszabályában rögzített feladatok végrehajtásáért ezen ösztöndíjon belül kerülnek jutalmazásra. A képviselők beszámolói az EHK honlapján publikálásra kerülnek.",
    content_en:
      "Members of the University Student Union are rewarded through this scholarship for carrying out the tasks defined in the Rules and Regulations of the BME Students’ and Doctoral Students’ Union. Reports submitted by the representatives are published on the website of the University Student Union.",
  },
  {
    title_hu: "Egyetemi Doktorandusz Képviselet ösztöndíj",
    title_en: "University Doctoral Student Union Scholarship",
    content_hu:
      "Az Egyetemi Doktorandusz Képviselet tagjai a BME Hallgatói és Doktorandusz Önkormányzat Alapszabályában rögzített feladatok végrehajtásáért ezen ösztöndíjon belül kerülnek jutalmazásra. A képviselők beszámolói az EDK honlapján publikálásra kerülnek.",
    content_en:
      "Members of the University Doctoral Student Union are rewarded through this scholarship for carrying out the tasks defined in the Rules and Regulations of the BME Students’ and Doctoral Students’ Union. Reports submitted by the representatives are published on the website of the University Doctoral Student Union.",
  },
  {
    title_hu: "Egyetemi BME ösztöndíj",
    title_en: "University BME Scholarship",
    content_hu:
      "Az Egyetemi BME ösztöndíj a mintatantervekben meghatározott követelményeken túlmutató szakmai és tudományos teljesítményen alapuló legmagasabb szintű elismerések egyike. Az ösztöndíjjal az Egyetemi Hallgatói Képviselet a legkiválóbb hallgatókat jutalmazza, akik kimagasló szakmai vagy tudományos eredményt értek el az előző félévük során.",
    content_en:
      "The University BME Scholarship is one of the highest-level recognitions based on professional and scientific achievements that go beyond the requirements defined in the model curricula. Through this scholarship, the University Student Union rewards the most outstanding students who achieved exceptional professional or scientific results during the previous semester.",
  },
  {
    title_hu: "Nemzeti felsőoktatási ösztöndíj",
    title_en: "National Higher Education Scholarship",
    content_hu:
      "A kiemelkedő tanulmányi eredményű, szakmai téren kimagasló teljesítményt nyújtó hallgatók részére a felsőoktatásért felelős miniszter nemzeti felsőoktatási ösztöndíjat adományoz egy tanév időtartamára. Az ösztöndíj elbírálásának menetét, részleteit az adott évben kiadott Rektori Utasítás határozza meg.",
    content_en:
      "For students with outstanding academic results and exceptional professional achievements, the minister responsible for higher education awards the National Higher Education Scholarship for the duration of one academic year. The procedure and details of the evaluation are defined by the Rector’s Instruction issued for the given year.",
  },
  {
    title_hu: "Egyetemi közéleti ösztöndíj",
    title_en: "University Public Life Scholarship",
    content_hu:
      "Az Egyetemi közéleti ösztöndíj azoknak a hallgatóknak szól, akik az EHK munkáját segítő közéleti tevékenységet végeznek, például rendezvények szervezésében való segédkezés.",
    content_en:
      "The University Public Life Scholarship is intended for students who carry out public life activities supporting the work of the University Student Union, such as assisting in the organization of events.",
  },
  {
    title_hu: "Egyetemi közösségi ösztöndíj",
    title_en: "University Community Scholarship",
    content_hu:
      "Az Egyetemi közösségi ösztöndíj azoknak a hallgatóknak szól, akik a BME közösségi életében aktívan részt vesz. Pályázni lehet egyetemi öntevékeny körben és szakkollégiumban, a Műegyetemi Versenycsapat Közösségben vagy a Hallgatói Külügyi Testületben végzett tevékenységgel. Az ösztöndíj célja, hogy elismerje azokat a hallgatókat, akik tanulmányaik mellett közösségi munkájukkal is értéket teremtenek az egyetemen.",
    content_en:
      "The University Community Scholarship is intended for students who actively participate in community life at BME. Applications may be submitted for activities carried out in university self-organizing student groups and colleges for advanced studies, in the BME Racing Teams Community, or in the Student International Relations Committee. The aim of the scholarship is to recognize students who create value at the university through their community work alongside their studies.",
  },
  {
    title_hu: "Sportösztöndíj",
    title_en: "Sports Scholarship",
    content_hu:
      "A Sportösztöndíj keretein belül az Egyetemi Hallgatói Képviselet azokat a hallgatókat jutalmazza, akik a testnevelési órákon felül és az egyetemi tanulmányaik mellett kimagasló sportteljesítményt nyújtottak.",
    content_en:
      "Within the framework of the Sports Scholarship, the University Student Union rewards students who, in addition to physical education classes and their university studies, have demonstrated outstanding athletic performance.",
  },
  {
    title_hu: "BME “Jó tanuló, jó sportoló” ösztöndíj",
    title_en: "BME “Good Student, Good Athlete” Scholarship",
    content_hu:
      "A “Jó tanuló, jó sportoló” ösztöndíj nem csak a kimagasló sportteljesítményt díjazó ösztöndíj, hanem a versenyszerű sportolás mellett sikeresen teljesített tanulmányi eredményeket is figyelembe veszi. Az érvényes pályázáshoz a hallgató kreditindexének el kell érnie a 3,00 értékét.",
    content_en:
      "The “Good Student, Good Athlete” Scholarship not only rewards outstanding athletic performance but also takes into account successful academic achievements alongside competitive sports activities. To submit a valid application, the student’s credit index must reach a value of 3.00.",
  },
  {
    title_hu: "Tudományos Diákköri Konferencia ösztöndíj",
    title_en: "Scientific Students’ Conference Scholarship",
    content_hu:
      "Az ösztöndíj célja, hogy elismerje a Tudományos Diákköri Konferencián nyújtott kiemelkedő munkát. Azok a hallgatók pályázhatnak, akik részt vettek a BME-n megrendezésre kerülő TDK Konferencián, és azon 1., 2., vagy 3. helyezést ért el, különdíjban vagy dicséretben részesültek.",
    content_en:
      "The aim of the scholarship is to recognize outstanding work performed at the Scientific Students’ Conference. Students may apply if they participated in the Scientific Students’ Conference organized at BME and achieved 1st, 2nd or 3rd place, or received a special prize or commendation.",
  },
];

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "ehk_scholarships" (
    "id" serial PRIMARY KEY NOT NULL,
    "title_hu" varchar NOT NULL,
    "title_en" varchar NOT NULL,
    "content_hu" jsonb NOT NULL,
    "content_en" jsonb NOT NULL,
    "order" numeric DEFAULT 0 NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ehk_scholarships_id" integer;
  CREATE INDEX "ehk_scholarships_updated_at_idx" ON "ehk_scholarships" USING btree ("updated_at");
  CREATE INDEX "ehk_scholarships_created_at_idx" ON "ehk_scholarships" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ehk_scholarships_fk" FOREIGN KEY ("ehk_scholarships_id") REFERENCES "public"."ehk_scholarships"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ehk_scholarships_id_idx" ON "payload_locked_documents_rels" USING btree ("ehk_scholarships_id");`);

  for (const [index, scholarship] of scholarships.entries()) {
    await payload.create({
      collection: "ehk-scholarships",
      data: {
        title_hu: scholarship.title_hu,
        title_en: scholarship.title_en,
        content_hu: doc(scholarship.content_hu),
        content_en: doc(scholarship.content_en),
        order: index + 1,
      },
      overrideAccess: true,
      req,
    });
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ehk_scholarships_fk";
  DROP INDEX "payload_locked_documents_rels_ehk_scholarships_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ehk_scholarships_id";
  ALTER TABLE "ehk_scholarships" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ehk_scholarships" CASCADE;`);
}
