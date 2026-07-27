import type {
  MigrateDownArgs,
  MigrateUpArgs,
} from "@payloadcms/db-postgres";
import path from "path";

import enDictionary from "../dictionaries/en/dormitory_details.json";
import huDictionary from "../dictionaries/hu/dormitory_details.json";

const dormitories = [
  {
    name: "Baross Gábor Kollégium",
    slug: "baross",
    coverImagePath: "public/kolik/baross.jpg",
  },
  {
    name: "Bercsényi 28-30 Kollégium",
    slug: "bercsenyi",
    coverImagePath: "public/kolik/bercsenyi.jpg",
  },
  {
    name: "Kármán Tódor Kollégium",
    slug: "karman",
    coverImagePath: "public/kolik/karman.jpg",
  },
  {
    name: "Martos Kollégium",
    slug: "martos",
    coverImagePath: "public/kolik/martos.jpg",
  },
  {
    name: "Schönherz Kollégium",
    slug: "sch",
    coverImagePath: "public/kolik/schonherz.jpg",
  },
  {
    name: "Vásárhelyi Pál Kollégium",
    slug: "vpk",
    coverImagePath: "public/kolik/vasarhelyi.jpg",
  },
  {
    name: "Wigner Jenő Kollégium",
    slug: "wigner",
    coverImagePath: "public/kolik/wigner.jpg",
  },
] as const;

const richTextDocument = (description: string) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: description
      .replaceAll("(Image)", "")
      .split(/\n+/)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({
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

export async function up({
  payload,
  req,
}: MigrateUpArgs): Promise<void> {
  for (const [order, dormitory] of dormitories.entries()) {
    const existingDormitory = await payload.find({
      collection: "dormitories",
      limit: 1,
      where: {
        slug: {
          equals: dormitory.slug,
        },
      },
      req,
    });

    if (existingDormitory.docs.length > 0) {
      continue;
    }

    const mediaAlt = `EHK kollégiumi borítókép – ${dormitory.name}`;
    const existingMedia = await payload.find({
      collection: "media",
      limit: 1,
      where: {
        alt: {
          equals: mediaAlt,
        },
      },
      req,
    });

    const coverImage =
      existingMedia.docs[0] ??
      (await payload.create({
        collection: "media",
        data: {
          alt: mediaAlt,
        },
        filePath: path.resolve(process.cwd(), dormitory.coverImagePath),
        req,
      }));

    await payload.create({
      collection: "dormitories",
      data: {
        name: dormitory.name,
        slug: dormitory.slug,
        coverImage: coverImage.id,
        description_hu: richTextDocument(
          huDictionary.dormitory_details[dormitory.slug].description,
        ),
        description_en: richTextDocument(
          enDictionary.dormitory_details[dormitory.slug].description,
        ),
        order,
      },
      req,
    });
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Intentionally keep CMS content and uploaded media on rollback.
}
