import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

import enDictionary from "../dictionaries/en/ontevekeny_korok.json";
import huDictionary from "../dictionaries/hu/ontevekeny_korok.json";

type LegacyOrganization = {
  id: string;
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

const getOrganizations = (locale: "hu" | "en") =>
  (locale === "hu"
    ? huDictionary.ontevekeny_korok.korok
    : enDictionary.ontevekeny_korok.korok) as LegacyOrganization[];

const getContacts = (organization: LegacyOrganization) =>
  organization.social_links.reduce(
    (contacts, link) => {
      const label = `${link.label} ${link.url}`.toLowerCase();

      if (link.url.startsWith("mailto:")) {
        contacts.email = link.url.replace("mailto:", "");
      } else if (label.includes("facebook")) {
        contacts.facebookUrl = link.url;
      } else if (label.includes("instagram")) {
        contacts.instagramUrl = link.url;
      } else if (label.includes("linkedin")) {
        contacts.linkedinUrl = link.url;
      } else if (label.includes("youtube")) {
        contacts.youtubeUrl = link.url;
      } else if (label.includes("website") || label.includes("weblap")) {
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
      email?: string;
    },
  );

export async function up({
  db,
  payload,
  req,
}: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "student_clubs_activities" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text_hu" varchar NOT NULL,
      "text_en" varchar NOT NULL
    );

    CREATE TABLE "student_clubs_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );

    CREATE TABLE "student_clubs" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "presentation_hu" jsonb NOT NULL,
      "presentation_en" jsonb NOT NULL,
      "targetaudience_hu" jsonb,
      "targetaudience_en" jsonb,
      "contacts_website_url" varchar,
      "contacts_facebook_url" varchar,
      "contacts_instagram_url" varchar,
      "contacts_linkedin_url" varchar,
      "contacts_youtube_url" varchar,
      "contacts_email" varchar,
      "jointext_hu" varchar,
      "jointext_en" varchar,
      "join_url" varchar,
      "order" numeric DEFAULT 0 NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN "student_clubs_id" integer;
    ALTER TABLE "student_clubs_activities"
      ADD CONSTRAINT "student_clubs_activities_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."student_clubs"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "student_clubs_gallery"
      ADD CONSTRAINT "student_clubs_gallery_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "student_clubs_gallery"
      ADD CONSTRAINT "student_clubs_gallery_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."student_clubs"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_student_clubs_fk"
      FOREIGN KEY ("student_clubs_id") REFERENCES "public"."student_clubs"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "student_clubs_activities_order_idx"
      ON "student_clubs_activities" USING btree ("_order");
    CREATE INDEX "student_clubs_activities_parent_id_idx"
      ON "student_clubs_activities" USING btree ("_parent_id");
    CREATE INDEX "student_clubs_gallery_order_idx"
      ON "student_clubs_gallery" USING btree ("_order");
    CREATE INDEX "student_clubs_gallery_parent_id_idx"
      ON "student_clubs_gallery" USING btree ("_parent_id");
    CREATE INDEX "student_clubs_gallery_image_idx"
      ON "student_clubs_gallery" USING btree ("image_id");
    CREATE INDEX "student_clubs_order_idx"
      ON "student_clubs" USING btree ("order");
    CREATE INDEX "student_clubs_updated_at_idx"
      ON "student_clubs" USING btree ("updated_at");
    CREATE INDEX "student_clubs_created_at_idx"
      ON "student_clubs" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_student_clubs_id_idx"
      ON "payload_locked_documents_rels" USING btree ("student_clubs_id");
  `);

  const huOrganizations = getOrganizations("hu");
  const enOrganizations = getOrganizations("en");

  for (const [order, organization] of huOrganizations.entries()) {
    const english = enOrganizations[order] ?? organization;
    const contacts = getContacts(organization);
    const isAerospace = organization.id === "bme_aerospace";

    await payload.create({
      collection: "student-clubs",
      data: {
        name: organization.title,
        presentation_hu: richTextDocument(organization.description),
        presentation_en: richTextDocument(english.description),
        contacts,
        joinText_hu: isAerospace
          ? "Érdekel az űrkutatás és a rakétatechnika?"
          : "Szeretnél csatlakozni ehhez a közösséghez?",
        joinText_en: isAerospace
          ? "Interested in space research and rocket technology?"
          : "Would you like to join this community?",
        joinUrl:
          contacts.websiteUrl ??
          contacts.facebookUrl ??
          contacts.instagramUrl,
        order,
        ...(isAerospace && {
          activities: [
            { text_hu: "Rakétaépítés", text_en: "Rocket building" },
            {
              text_hu: "Tudományos kísérletek",
              text_en: "Scientific experiments",
            },
            {
              text_hu: "Fedélzeti elektronika fejlesztése",
              text_en: "Onboard electronics development",
            },
            {
              text_hu: "Antennarendszerek tervezése",
              text_en: "Antenna system design",
            },
            {
              text_hu: "Aerodinamikai szabályozás",
              text_en: "Aerodynamic control",
            },
          ],
          targetAudience_hu: richTextDocument([
            "Minden BME hallgatónak, akit érdekel az űrkutatás, az űrtechnológia és a rakétatechnika — különösen azoknak, akik nem csak elméleti tudást, hanem valódi fejlesztési tapasztalatot szeretnének szerezni.",
          ]),
          targetAudience_en: richTextDocument([
            "For every BME student interested in space research, space technology and rocket engineering — especially those who want real development experience in addition to theoretical knowledge.",
          ]),
        }),
      },
      req,
    });
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT "payload_locked_documents_rels_student_clubs_fk";
    DROP INDEX "payload_locked_documents_rels_student_clubs_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN "student_clubs_id";
    DROP TABLE "student_clubs_activities" CASCADE;
    DROP TABLE "student_clubs_gallery" CASCADE;
    DROP TABLE "student_clubs" CASCADE;
  `);
}
