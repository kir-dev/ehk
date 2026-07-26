import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

import enDictionary from "../dictionaries/en/advanced_colleges.json";
import huDictionary from "../dictionaries/hu/advanced_colleges.json";

type LegacyOrganization = {
  id?: string;
  title: string;
  description: string[];
  social_links: { label: string; url: string }[];
};

const richTextDocument = (paragraphs: string[]) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
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
    })),
  },
});

const getOrganizations = (locale: "hu" | "en") => {
  const source =
    locale === "hu"
      ? huDictionary.advanced_colleges
      : enDictionary.advanced_colleges;

  return [source.muszak, ...source.teams] as LegacyOrganization[];
};

const normalizeUrl = (url: string | undefined) => {
  if (!url) {
    return undefined;
  }

  return url.replace(/^http:\/\//, "https://");
};

const getContacts = (organization: LegacyOrganization) => {
  return organization.social_links.reduce(
    (contacts, link) => {
      const url = normalizeUrl(link.url);
      const label = `${link.label} ${link.url}`.toLowerCase();

      if (!url) {
        return contacts;
      }
      if (label.includes("facebook")) {
        contacts.facebookUrl = url;
      } else if (label.includes("instagram")) {
        contacts.instagramUrl = url;
      } else if (label.includes("linkedin")) {
        contacts.linkedinUrl = url;
      } else if (label.includes("youtube")) {
        contacts.youtubeUrl = url;
      } else {
        contacts.websiteUrl = url;
      }

      return contacts;
    },
    {} as {
      websiteUrl?: string;
      facebookUrl?: string;
      instagramUrl?: string;
      linkedinUrl?: string;
      youtubeUrl?: string;
    },
  );
};

export async function up({
  db,
  payload,
  req,
}: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "specialized_colleges_events" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eventname_hu" varchar NOT NULL,
      "eventname_en" varchar NOT NULL,
      "frequency_hu" varchar,
      "frequency_en" varchar
    );

    CREATE TABLE "specialized_colleges_activities" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text_hu" varchar NOT NULL,
      "text_en" varchar NOT NULL
    );

    CREATE TABLE "specialized_colleges_departments" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text_hu" varchar NOT NULL,
      "text_en" varchar NOT NULL
    );

    CREATE TABLE "specialized_colleges_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );

    CREATE TABLE "specialized_colleges" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "stats_founded_year" numeric,
      "stats_members_count" varchar,
      "stats_faculties" varchar,
      "presentation_hu" jsonb NOT NULL,
      "presentation_en" jsonb NOT NULL,
      "targetaudience_hu" jsonb,
      "targetaudience_en" jsonb,
      "contacts_website_url" varchar,
      "contacts_facebook_url" varchar,
      "contacts_instagram_url" varchar,
      "contacts_linkedin_url" varchar,
      "contacts_youtube_url" varchar,
      "join_url" varchar,
      "order" numeric DEFAULT 0 NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN "specialized_colleges_id" integer;

    ALTER TABLE "specialized_colleges_events"
      ADD CONSTRAINT "specialized_colleges_events_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."specialized_colleges"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "specialized_colleges_activities"
      ADD CONSTRAINT "specialized_colleges_activities_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."specialized_colleges"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "specialized_colleges_departments"
      ADD CONSTRAINT "specialized_colleges_departments_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."specialized_colleges"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "specialized_colleges_gallery"
      ADD CONSTRAINT "specialized_colleges_gallery_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "specialized_colleges_gallery"
      ADD CONSTRAINT "specialized_colleges_gallery_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."specialized_colleges"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_specialized_colleges_fk"
      FOREIGN KEY ("specialized_colleges_id")
      REFERENCES "public"."specialized_colleges"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "specialized_colleges_events_order_idx"
      ON "specialized_colleges_events" USING btree ("_order");
    CREATE INDEX "specialized_colleges_events_parent_id_idx"
      ON "specialized_colleges_events" USING btree ("_parent_id");
    CREATE INDEX "specialized_colleges_activities_order_idx"
      ON "specialized_colleges_activities" USING btree ("_order");
    CREATE INDEX "specialized_colleges_activities_parent_id_idx"
      ON "specialized_colleges_activities" USING btree ("_parent_id");
    CREATE INDEX "specialized_colleges_departments_order_idx"
      ON "specialized_colleges_departments" USING btree ("_order");
    CREATE INDEX "specialized_colleges_departments_parent_id_idx"
      ON "specialized_colleges_departments" USING btree ("_parent_id");
    CREATE INDEX "specialized_colleges_gallery_order_idx"
      ON "specialized_colleges_gallery" USING btree ("_order");
    CREATE INDEX "specialized_colleges_gallery_parent_id_idx"
      ON "specialized_colleges_gallery" USING btree ("_parent_id");
    CREATE INDEX "specialized_colleges_gallery_image_idx"
      ON "specialized_colleges_gallery" USING btree ("image_id");
    CREATE INDEX "specialized_colleges_order_idx"
      ON "specialized_colleges" USING btree ("order");
    CREATE INDEX "specialized_colleges_updated_at_idx"
      ON "specialized_colleges" USING btree ("updated_at");
    CREATE INDEX "specialized_colleges_created_at_idx"
      ON "specialized_colleges" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_specialized_colleges_id_idx"
      ON "payload_locked_documents_rels"
      USING btree ("specialized_colleges_id");
  `);

  const huOrganizations = getOrganizations("hu");
  const enOrganizations = getOrganizations("en");

  for (const [order, organization] of huOrganizations.entries()) {
    const english = enOrganizations[order] ?? organization;
    const contacts = getContacts(organization);
    const isEnergetic = organization.id === "energetikai";
    const isMuszak = order === 0;

    await payload.create({
      collection: "specialized-colleges",
      data: {
        name: organization.title,
        presentation_hu: richTextDocument(organization.description),
        presentation_en: richTextDocument(english.description),
        contacts,
        order,
        ...(isMuszak && {
          events: [
            {
              eventName_hu: "MŰSZAK Tábor",
              eventName_en: "MŰSZAK Camp",
              frequency_hu: "félévente",
              frequency_en: "every semester",
            },
          ],
        }),
        ...(isEnergetic && {
          stats: { foundedYear: 2002 },
          events: [
            {
              eventName_hu: "IYCE nemzetközi konferencia",
              eventName_en: "IYCE international conference",
              frequency_hu: "kétévente",
              frequency_en: "every two years",
            },
            {
              eventName_hu: "Középiskolás többfordulós tanulmányi verseny",
              eventName_en: "Multi-round secondary school competition",
              frequency_hu: "évente",
              frequency_en: "annually",
            },
            {
              eventName_hu:
                "Expók és fesztiválok saját demonstrációs eszközökkel",
              eventName_en:
                "Expos and festivals with custom demonstration devices",
            },
          ],
          activities: [
            {
              text_hu: "Ipari üzemlátogatások",
              text_en: "Industrial site visits",
            },
            {
              text_hu: "Belsős kurzusok és tréningek",
              text_en: "Internal courses and training",
            },
            {
              text_hu: "TDK-támogatás és kutatás",
              text_en: "Research and student research support",
            },
            {
              text_hu: "Nyilvános előadássorozat",
              text_en: "Public lecture series",
            },
            {
              text_hu: "Csapatépítők, kirándulások, PubQuiz",
              text_en: "Team building, trips and pub quizzes",
            },
          ],
          targetAudience_hu: richTextDocument([
            "Minden hallgatónak, akit érdekel az energetika és szeretne az egyetemi tananyagon túlmutató ipari és tudományos tapasztalatot szerezni. Nyitott azok felé is, akik kutatásban szeretnének részt venni, vagy csak egy aktív, szakmai közösség részei lennének.",
          ]),
          targetAudience_en: richTextDocument([
            "For every student interested in energy who wants industrial and scientific experience beyond the university curriculum, including those looking to join research or an active professional community.",
          ]),
          joinUrl: contacts.websiteUrl,
        }),
      },
      req,
    });
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT "payload_locked_documents_rels_specialized_colleges_fk";
    DROP INDEX "payload_locked_documents_rels_specialized_colleges_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN "specialized_colleges_id";
    DROP TABLE "specialized_colleges_events" CASCADE;
    DROP TABLE "specialized_colleges_activities" CASCADE;
    DROP TABLE "specialized_colleges_departments" CASCADE;
    DROP TABLE "specialized_colleges_gallery" CASCADE;
    DROP TABLE "specialized_colleges" CASCADE;
  `);
}
