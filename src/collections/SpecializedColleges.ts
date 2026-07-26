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
  if (!value) {
    return true;
  }

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

export const SpecializedColleges: CollectionConfig = {
  slug: "specialized-colleges",
  labels: {
    singular: "Szakkollégium",
    plural: "Szakkollégiumok",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    description:
      "A Közélet / Szakkollégiumok oldalon megjelenő szervezetek kezelése.",
  },
  fields: [
    {
      name: "name",
      label: "Név",
      type: "text",
      required: true,
    },
    {
      name: "stats",
      label: "Statisztikák",
      type: "group",
      fields: [
        {
          name: "foundedYear",
          label: "Alapítás éve",
          type: "number",
        },
        {
          name: "membersCount",
          label: "Tagok száma",
          type: "text",
          admin: { placeholder: "pl. ~800 alumni" },
        },
        {
          name: "faculties",
          label: "Karok",
          type: "text",
          admin: { placeholder: "pl. mind" },
        },
      ],
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
      name: "events",
      label: "Kiemelt események",
      type: "array",
      fields: [
        {
          name: "eventName_hu",
          label: "Esemény neve (magyar)",
          type: "text",
          required: true,
        },
        {
          name: "eventName_en",
          label: "Esemény neve (angol)",
          type: "text",
          required: true,
        },
        {
          name: "frequency_hu",
          label: "Gyakoriság (magyar)",
          type: "text",
        },
        {
          name: "frequency_en",
          label: "Gyakoriság (angol)",
          type: "text",
        },
      ],
    },
    {
      name: "activities",
      label: "Tevékenységek",
      type: "array",
      fields: localizedTextFields,
    },
    {
      name: "departments",
      label: "Tagozatok",
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
