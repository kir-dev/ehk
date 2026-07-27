import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
  ],
});

const validateOptionalUrl = (value: string | null | undefined) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? true
      : "A linknek HTTP vagy HTTPS URL-nek kell lennie.";
  } catch {
    return "Érvénytelen URL formátum.";
  }
};

const localizedTextFields = [
  {
    name: "text_hu",
    label: "Szöveg (magyar)",
    type: "text" as const,
    required: true,
  },
  {
    name: "text_en",
    label: "Szöveg (angol)",
    type: "text" as const,
    required: true,
  },
];

export const StudentClubs: CollectionConfig = {
  slug: "student-clubs",
  labels: {
    singular: "Öntevékeny kör",
    plural: "Öntevékeny körök",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    description:
      "A Közélet / Öntevékeny körök oldalon megjelenő közösségek kezelése.",
  },
  fields: [
    {
      name: "name",
      label: "Név",
      type: "text",
      required: true,
    },
    {
      name: "presentation_hu",
      label: "Bemutatás (magyar)",
      type: "richText",
      required: true,
      editor: richTextEditor,
    },
    {
      name: "presentation_en",
      label: "Bemutatás (angol)",
      type: "richText",
      required: true,
      editor: richTextEditor,
    },
    {
      name: "activities",
      label: "Tevékenységek",
      type: "array",
      fields: localizedTextFields,
    },
    {
      name: "targetAudience_hu",
      label: "Kinek ajánljuk? (magyar)",
      type: "richText",
      editor: richTextEditor,
    },
    {
      name: "targetAudience_en",
      label: "Kinek ajánljuk? (angol)",
      type: "richText",
      editor: richTextEditor,
    },
    {
      name: "contacts",
      label: "Elérhetőségek",
      type: "group",
      fields: [
        ...[
          "websiteUrl",
          "facebookUrl",
          "instagramUrl",
          "linkedinUrl",
          "youtubeUrl",
        ].map((name) => ({
          name,
          label: name.replace("Url", " URL"),
          type: "text" as const,
          validate: validateOptionalUrl,
        })),
        {
          name: "email",
          label: "Email",
          type: "email" as const,
        },
      ],
    },
    {
      name: "gallery",
      label: "Galéria",
      type: "array",
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
    {
      name: "joinText_hu",
      label: "Csatlakozási banner szövege (magyar)",
      type: "text",
    },
    {
      name: "joinText_en",
      label: "Csatlakozási banner szövege (angol)",
      type: "text",
    },
    {
      name: "joinUrl",
      label: "Csatlakozási URL",
      type: "text",
      validate: validateOptionalUrl,
    },
    {
      name: "order",
      label: "Sorrend",
      type: "number",
      required: true,
      defaultValue: 0,
      index: true,
    },
  ],
};
