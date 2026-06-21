import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from "payload";

const validateFacebookUrl = (val: string | null | undefined) => {
  if (!val) return true;

  try {
    const parsed = new URL(val.trim());
    const hostname = parsed.hostname.toLowerCase();
    const isFacebookHost = hostname === "facebook.com" || hostname.endsWith(".facebook.com");

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "A Facebook esemény linknek érvényes HTTP vagy HTTPS URL-nek kell lennie.";
    }

    if (!isFacebookHost) {
      return "A Facebook esemény linknek facebook.com domainre kell mutatnia.";
    }

    return true;
  } catch {
    return "Érvénytelen Facebook esemény link formátum.";
  }
};

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Esemény",
    plural: "Események",
  },
  admin: {
    useAsTitle: "title_hu",
    description:
      "Események gyűjteménye - egy napos és többszörös napos eseményekhez",
    defaultColumns: ["title_hu", "date.startDate", "date.endDate", "createdAt"],
  },
  fields: [
    {
      name: "title_hu",
      label: "Cím (magyar)",
      type: "text",
      required: true,
    },
    {
      name: "title_en",
      label: "Cím (angol)",
      type: "text",
      required: true,
    },
    {
      name: "shortDescription",
      label: "Rövid leírás",
      type: "group",
      fields: [
        {
          name: "description_hu",
          label: "Rövid leírás (magyar)",
          type: "text",
          required: true,
        },
        {
          name: "description_en",
          label: "Rövid leírás (angol)",
          type: "text",
          required: true,
        },
      ],
      required: true,
    },
    {
      name: "date",
      label: "Dátum",
      type: "group",
      fields: [
        {
          name: "startDate",
          label: "Kezdő dátum és időpont",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "yyyy-MM-dd HH:mm",
            },
          },
          required: true,
        },
        {
          name: "endDate",
          label: "Záró dátum és időpont",
          type: "date",
          required: true,
          admin: {
            description:
              "Ha egy napos esemény, akkor ugyanaz legyen mint a kezdő dátum",
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "yyyy-MM-dd HH:mm",
            },
          },
        },
      ],
      required: true,
    },
    {
      name: "location",
      label: "Helyszín",
      type: "group",
      fields: [
        {
          name: "location_hu",
          label: "Helyszín (magyar)",
          type: "text",
          required: false,
        },
        {
          name: "location_en",
          label: "Helyszín (angol)",
          type: "text",
          required: false,
        },
      ],
      required: false,
    },
    {
      name: "image",
      label: "Borítókép",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "detailedDescription",
      label: "Részletes leírás",
      type: "group",
      fields: [
        {
          name: "description_hu",
          label: "Részletes leírás (magyar)",
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
          label: "Részletes leírás (angol)",
          type: "richText",
          required: false,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
      required: false,
    },
    {
      name: "facebookUrl",
      label: "Facebook esemény link",
      type: "text",
      required: false,
      validate: validateFacebookUrl,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Automatically set endDate to startDate if not provided
        if (data?.date?.startDate && !data?.date?.endDate) {
          data.date.endDate = data.date.startDate;
        }

        return data;
      },
    ],
  },
};
