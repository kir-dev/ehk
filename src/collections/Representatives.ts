import { CollectionConfig } from "payload";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Representatives: CollectionConfig = {
  slug: "representatives",
  labels: {
    singular: "Képviselő",
    plural: "Képviselők",
  },
  admin: {
    description: "Képviselők adatainak kezelése. Beszámolók feltöltése.",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Név",
    },
    {
      name: "position",
      type: "array",
      required: false,
      label: "Pozíció",
      fields: [
        {
          name: "position_hu",
          type: "text",
          required: true,
          label: "Pozíció (magyar)",
        },
        {
          name: "position_en",
          type: "text",
          required: true,
          label: "Pozíció (angol)",
        },
      ],
    },
    {
      name: "emails",
      type: "array",
      required: false,
      label: "E-mail címek",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          label: "E-mail cím",
        },
      ],
    },
    {
      name: "introduction",
      type: "group",
      required: true,
      label: "Bemutatkozás",
      fields: [
        {
          name: "text_hu",
          type: "richText",
          required: true,
          label: "Bemutatkozás (magyar)",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
        {
          name: "text_en",
          type: "richText",
          required: true,
          label: "Bemutatkozás (angol)",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
};
