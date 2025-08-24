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
      name: "picture",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Kép",
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
    {
      name: "faculty",
      type: "select",
      required: false,
      label: "Kar",
      options: [
        {
          label: "ÉMK",
          value: "ÉMK",
        },
        {
          label: "GPK",
          value: "GPK",
        },
        {
          label: "ÉPK",
          value: "ÉPK",
        },
        {
          label: "VBK",
          value: "VBK",
        },
        {
          label: "VIK",
          value: "VIK",
        },
        {
          label: "GTK",
          value: "GTK",
        },
        {
          label: "TTK",
          value: "TTK",
        },
        {
          label: "KJK",
          value: "KJK",
        },
      ],
    },
    {
      name: "order",
      type: "number",
      required: false,
      label: "Rendezési szám",
    },
    {
      name: "files",
      type: "array",
      required: false,
      label: "Beszámolók",
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Fájl",
        },
        {
          name: "title_hu",
          type: "text",
          required: true,
          label: "Cím (magyar)",
        },
        {
          name: "title_en",
          type: "text",
          required: false,
          label: "Cím (angol)",
        },
      ],
    },
  ],
};
