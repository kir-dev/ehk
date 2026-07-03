import type { CollectionConfig } from "payload";
import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

const validateOptionalUrl = (val: string | null | undefined) => {
  if (!val) return true;

  try {
    const parsed = new URL(val);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "A linknek érvényes HTTP vagy HTTPS URL-nek kell lennie (pl. https://example.com).";
    }
    return true;
  } catch {
    return "Érvénytelen URL formátum.";
  }
};

export const Dormitories: CollectionConfig = {
  slug: "dormitories",
  labels: {
    singular: "Kollégium",
    plural: "Kollégiumok",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "capacity", "order"],
    description: "A kollégium bemutató oldalon megjelenő kollégiumok kezelése.",
  },
  fields: [
    {
      name: "name",
      label: "Név",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Útvonalhoz használt azonosító, pl. baross, sch.",
      },
    },
    {
      name: "coverImage",
      label: "Borítókép",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "externalLink",
      label: "Külső link",
      type: "text",
      required: false,
      admin: {
        description: "Opcionális külső oldal, ahová a Részletek gomb navigál.",
      },
      validate: validateOptionalUrl,
    },
    {
      name: "description_hu",
      label: "Leírás (magyar)",
      type: "richText",
      required: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: "description_en",
      label: "Leírás (angol)",
      type: "richText",
      required: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: "capacity",
      label: "Férőhelyek száma",
      type: "number",
      required: false,
    },
    {
      name: "address_hu",
      label: "Cím (magyar)",
      type: "text",
      required: false,
    },
    {
      name: "address_en",
      label: "Cím (angol)",
      type: "text",
      required: false,
    },
    {
      name: "mapUrl",
      label: "Google Maps link",
      type: "text",
      required: false,
      admin: {
        description: "Opcionális Google Maps vagy térkép link a címhez.",
      },
      validate: validateOptionalUrl,
    },
    {
      name: "roomInfo_hu",
      label: "Szobainformáció (magyar)",
      type: "text",
      required: false,
    },
    {
      name: "roomInfo_en",
      label: "Szobainformáció (angol)",
      type: "text",
      required: false,
    },
    {
      name: "targetAudience_hu",
      label: "Célközönség (magyar)",
      type: "text",
      required: false,
    },
    {
      name: "targetAudience_en",
      label: "Célközönség (angol)",
      type: "text",
      required: false,
    },
    {
      name: "gallery",
      label: "Kategorizált galéria",
      type: "array",
      required: false,
      fields: [
        {
          name: "categoryName_hu",
          label: "Kategória neve (magyar)",
          type: "text",
          required: true,
        },
        {
          name: "categoryName_en",
          label: "Kategória neve (angol)",
          type: "text",
          required: false,
        },
        {
          name: "images",
          label: "Képek",
          type: "array",
          required: false,
          fields: [
            {
              name: "image",
              label: "Kép",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "order",
      label: "Sorrend",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};
