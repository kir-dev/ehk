import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

import enDictionary from "../dictionaries/en/competition_teams.json";
import huDictionary from "../dictionaries/hu/competition_teams.json";

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
      ? huDictionary.competition_teams
      : enDictionary.competition_teams;

  return [source.mvk, ...source.teams] as LegacyOrganization[];
};

const getContacts = (organization: LegacyOrganization) =>
  organization.social_links.reduce(
    (contacts, link) => {
      const label = `${link.label} ${link.url}`.toLowerCase();

      if (label.includes("facebook")) contacts.facebookUrl = link.url;
      else if (label.includes("instagram")) contacts.instagramUrl = link.url;
      else if (label.includes("linkedin")) contacts.linkedinUrl = link.url;
      else if (label.includes("youtube")) contacts.youtubeUrl = link.url;
      else if (
        label.includes("website") ||
        label.includes("weblap") ||
        label.includes("mvk.bme")
      ) {
        contacts.websiteUrl = link.url;
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

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "competitive_teams_events" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eventname_hu" varchar NOT NULL,
    "eventname_en" varchar NOT NULL,
    "frequency_hu" varchar,
    "frequency_en" varchar
  );

  CREATE TABLE "competitive_teams_activities" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text_hu" varchar NOT NULL,
    "text_en" varchar NOT NULL
  );

  CREATE TABLE "competitive_teams_departments" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text_hu" varchar NOT NULL,
    "text_en" varchar NOT NULL
  );

  CREATE TABLE "competitive_teams_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "image_id" integer NOT NULL
  );

  CREATE TABLE "competitive_teams" (
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

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "competitive_teams_id" integer;
  ALTER TABLE "competitive_teams_events" ADD CONSTRAINT "competitive_teams_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."competitive_teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "competitive_teams_activities" ADD CONSTRAINT "competitive_teams_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."competitive_teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "competitive_teams_departments" ADD CONSTRAINT "competitive_teams_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."competitive_teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "competitive_teams_gallery" ADD CONSTRAINT "competitive_teams_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "competitive_teams_gallery" ADD CONSTRAINT "competitive_teams_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."competitive_teams"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "competitive_teams_events_order_idx" ON "competitive_teams_events" USING btree ("_order");
  CREATE INDEX "competitive_teams_events_parent_id_idx" ON "competitive_teams_events" USING btree ("_parent_id");
  CREATE INDEX "competitive_teams_activities_order_idx" ON "competitive_teams_activities" USING btree ("_order");
  CREATE INDEX "competitive_teams_activities_parent_id_idx" ON "competitive_teams_activities" USING btree ("_parent_id");
  CREATE INDEX "competitive_teams_departments_order_idx" ON "competitive_teams_departments" USING btree ("_order");
  CREATE INDEX "competitive_teams_departments_parent_id_idx" ON "competitive_teams_departments" USING btree ("_parent_id");
  CREATE INDEX "competitive_teams_gallery_order_idx" ON "competitive_teams_gallery" USING btree ("_order");
  CREATE INDEX "competitive_teams_gallery_parent_id_idx" ON "competitive_teams_gallery" USING btree ("_parent_id");
  CREATE INDEX "competitive_teams_gallery_image_idx" ON "competitive_teams_gallery" USING btree ("image_id");
  CREATE INDEX "competitive_teams_order_idx" ON "competitive_teams" USING btree ("order");
  CREATE INDEX "competitive_teams_updated_at_idx" ON "competitive_teams" USING btree ("updated_at");
  CREATE INDEX "competitive_teams_created_at_idx" ON "competitive_teams" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_competitive_teams_fk" FOREIGN KEY ("competitive_teams_id") REFERENCES "public"."competitive_teams"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_competitive_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("competitive_teams_id");`);

  const huOrganizations = getOrganizations("hu");
  const enOrganizations = getOrganizations("en");

  for (const [order, organization] of huOrganizations.entries()) {
    const english = enOrganizations[order] ?? organization;
    const contacts = getContacts(organization);
    const isMvk = order === 0;
    const isMotorsport = organization.id === "bme_motorsport";

    await payload.create({
      collection: "competitive-teams",
      data: {
        name: isMvk
          ? "Műegyetemi Versenycsapat Közösség"
          : organization.title,
        presentation_hu: richTextDocument(organization.description),
        presentation_en: richTextDocument(english.description),
        contacts,
        order,
        ...(!isMvk && { joinUrl: contacts.websiteUrl }),
        ...(isMvk && {
          stats: { foundedYear: 2017 },
          departments: [
            {
              text_hu: "BME Formula Racing Team",
              text_en: "BME Formula Racing Team",
            },
            {
              text_hu: "BME Solar Boat Team",
              text_en: "BME Solar Boat Team",
            },
            { text_hu: "BME Motorsport", text_en: "BME Motorsport" },
            { text_hu: "BME Suborbitals", text_en: "BME Suborbitals" },
            { text_hu: "BME SharkTeam", text_en: "BME SharkTeam" },
          ],
          events: [
            {
              eventName_hu: "Formula Student",
              eventName_en: "Formula Student",
            },
            {
              eventName_hu: "Solar Boat Challenge",
              eventName_en: "Solar Boat Challenge",
            },
            {
              eventName_hu: "European Rocketry Challenge",
              eventName_en: "European Rocketry Challenge",
            },
            {
              eventName_hu: "Shell Eco Marathon",
              eventName_en: "Shell Eco Marathon",
            },
          ],
        }),
        ...(isMotorsport && {
          stats: {
            foundedYear: 2018,
            membersCount: "〜85 fő",
            faculties: "Formula Student",
          },
          events: [
            {
              eventName_hu:
                "Több dobogós helyezés különböző versenyszámokban és összesített eredményekben",
              eventName_en:
                "Multiple podium finishes in individual disciplines and overall results",
              frequency_hu: "Eredmény",
              frequency_en: "Result",
            },
            {
              eventName_hu:
                "Világranglista-vezető a kategóriájában — legjobb magyar csapat",
              eventName_en:
                "World ranking leader in its category — the best Hungarian team",
              frequency_hu: "Eredmény",
              frequency_en: "Result",
            },
          ],
          activities: [
            {
              text_hu: "Alkatrésztervezés és -gyártás",
              text_en: "Component design and manufacturing",
            },
            {
              text_hu: "Versenyautó építése és tesztelése",
              text_en: "Race car construction and testing",
            },
            { text_hu: "Versenyzés", text_en: "Racing" },
            {
              text_hu: "Menedzsment és logisztika",
              text_en: "Management and logistics",
            },
            { text_hu: "Gazdasági ügyek", text_en: "Business operations" },
          ],
          targetAudience_hu: richTextDocument([
            "Fiatal, tehetséges hallgatóknak — mérnök, közgazdász, matematikus vagy gazdaságtudományi szakon —, akik motorsport iránt érdeklődnek és kiemelkedő gyakorlati tapasztalatot szeretnének szerezni már az egyetem alatt. Azoknak ajánljuk, akik hajlandók hetente akár 80 órát is egy közös célért dolgozni.",
          ]),
          targetAudience_en: richTextDocument([
            "For talented engineering, economics, mathematics and business students interested in motorsport who want outstanding hands-on experience during university and are ready to work intensively toward a shared goal.",
          ]),
        }),
      },
      req,
    });
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels"
    DROP CONSTRAINT "payload_locked_documents_rels_competitive_teams_fk";
  DROP INDEX "payload_locked_documents_rels_competitive_teams_id_idx";
  ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN "competitive_teams_id";
  DROP TABLE "competitive_teams_events" CASCADE;
  DROP TABLE "competitive_teams_activities" CASCADE;
  DROP TABLE "competitive_teams_departments" CASCADE;
  DROP TABLE "competitive_teams_gallery" CASCADE;
  DROP TABLE "competitive_teams" CASCADE;`);
}
