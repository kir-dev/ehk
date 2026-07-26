import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

const richTextDocument = (text: string) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: [
      {
        type: "paragraph",
        direction: "ltr" as const,
        format: "",
        indent: 0,
        textFormat: 0,
        version: 1,
        children: [
          {
            type: "text",
            text,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            version: 1,
          },
        ],
      },
    ],
  },
});

const partnerUniversities = [
  {
    name: "Universidad Politécnica de Madrid",
    url: "https://www.upm.es/",
  },
  {
    name: "École des Ponts ParisTech",
    url: "https://ecoledesponts.fr/en",
  },
  {
    name: "Friedrich Alexander Universität Erlangen Nürnberg",
    url: "https://www.fau.eu/",
  },
  {
    name: "Istanbul Technical University",
    url: "https://www.itu.edu.tr/en",
  },
  {
    name: "Scuola Normale Superiore di Pisa",
    url: "https://www.sns.it/en",
  },
  {
    name: "Sant'Anna School of Advanced Studies",
    url: "https://www.santannapisa.it/en",
  },
  {
    name: "University Politechnica of Bucharest",
    url: "https://upb.ro/en/",
  },
  {
    name: "Paris Sciences et Lettres",
    url: "https://psl.eu/en",
  },
  {
    name: "Zürcher Hochschule für Angewandte Wissenschaften",
    url: "https://www.zhaw.ch/en/university",
  },
];

export async function up({
  db,
  payload,
  req,
}: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "eelisa_page_partner_universities" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE "eelisa_page_sidebar_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label_hu" varchar NOT NULL,
      "label_en" varchar NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE "eelisa_page_sidebar_contacts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "email" varchar NOT NULL
    );

    CREATE TABLE "eelisa_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "description_hu" jsonb NOT NULL,
      "description_en" jsonb NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    ALTER TABLE "eelisa_page_partner_universities"
      ADD CONSTRAINT "eelisa_page_partner_universities_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."eelisa_page"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "eelisa_page_sidebar_links"
      ADD CONSTRAINT "eelisa_page_sidebar_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."eelisa_page"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "eelisa_page_sidebar_contacts"
      ADD CONSTRAINT "eelisa_page_sidebar_contacts_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."eelisa_page"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "eelisa_page_partner_universities_order_idx"
      ON "eelisa_page_partner_universities" USING btree ("_order");
    CREATE INDEX "eelisa_page_partner_universities_parent_id_idx"
      ON "eelisa_page_partner_universities" USING btree ("_parent_id");
    CREATE INDEX "eelisa_page_sidebar_links_order_idx"
      ON "eelisa_page_sidebar_links" USING btree ("_order");
    CREATE INDEX "eelisa_page_sidebar_links_parent_id_idx"
      ON "eelisa_page_sidebar_links" USING btree ("_parent_id");
    CREATE INDEX "eelisa_page_sidebar_contacts_order_idx"
      ON "eelisa_page_sidebar_contacts" USING btree ("_order");
    CREATE INDEX "eelisa_page_sidebar_contacts_parent_id_idx"
      ON "eelisa_page_sidebar_contacts" USING btree ("_parent_id");
  `);

  await payload.updateGlobal({
    slug: "eelisa-page",
    data: {
      description_hu: richTextDocument(
        "Az EELISA (European Engineering Learning Innovation and Science Alliance) egy kilenc európai egyetemet összefogó szövetség, amelyben mérnöki, műszaki és szélesebb képzési profilú intézmények vesznek részt nyolc országból. A kezdeményezés célja, hogy közösen újragondolja, mit jelent ma európai mérnöknek lenni – olyan szakembert képezve, aki nemcsak technikai tudásával, hanem társadalmi felelősségvállalásával és széles látókörével is hozzájárul a jövő alakításához. Az EELISA a mérnöki, a tudományos és a humán területek összekapcsolásával egy befogadóbb, fenntarthatóbb és digitálisabb Európa megteremtésén dolgozik.",
      ),
      description_en: richTextDocument(
        "EELISA (European Engineering Learning Innovation and Science Alliance) is an alliance of nine European universities, involving engineering, technical, and broader educational institutions from eight countries. The initiative aims to jointly rethink what it means to be a European engineer today – training professionals who contribute to shaping the future not only with their technical knowledge but also with their social responsibility and broad perspective. By connecting engineering, scientific, and humanities fields, EELISA is working to create a more inclusive, sustainable, and digital Europe.",
      ),
      partnerUniversities,
      sidebarLinks: [
        {
          label_hu: "Aktuális programlehetőségek",
          label_en: "Current program opportunities",
          url: "https://eelisa.eu/news-events/",
        },
        {
          label_hu: "Pályázati felhívás",
          label_en: "Call for applications",
          url: "https://eelisa.bme.hu/wp-content/uploads/2025/10/Act-hallg-oszt-paly-2025-szeptember.pdf",
        },
      ],
      sidebarContacts: [
        {
          label: "international@bmeehk.hu",
          email: "international@bmeehk.hu",
        },
        {
          label: "eelisa@bme.hu",
          email: "eelisa@bme.hu",
        },
      ],
    },
    req,
  });
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "eelisa_page_partner_universities" CASCADE;
    DROP TABLE "eelisa_page_sidebar_links" CASCADE;
    DROP TABLE "eelisa_page_sidebar_contacts" CASCADE;
    DROP TABLE "eelisa_page" CASCADE;
  `);
}
