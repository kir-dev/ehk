import {
  BlockquoteFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    BlockquoteFeature(),
    FixedToolbarFeature(),
  ],
});

export const EhkScholarships: CollectionConfig = {
  slug: "ehk-scholarships",
  labels: {
    singular: "EHK ösztöndíj",
    plural: "EHK ösztöndíjak",
  },
  admin: {
    useAsTitle: "title_hu",
    defaultColumns: ["title_hu", "title_en", "order"],
    description:
      "Az EHK ösztöndíjak oldal lenyíló szekcióinak szerkeszthető tartalma.",
  },
  fields: [
    {
      name: "title_hu",
      type: "text",
      required: true,
      label: "Cím (magyar)",
    },
    {
      name: "title_en",
      type: "text",
      required: true,
      label: "Cím (angol)",
    },
    {
      name: "content_hu",
      type: "richText",
      required: true,
      label: "Tartalom (magyar)",
      editor: richTextEditor,
    },
    {
      name: "content_en",
      type: "richText",
      required: true,
      label: "Tartalom (angol)",
      editor: richTextEditor,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Sorrend",
      admin: {
        description: "Megjelenítési sorrend. A kisebb szám jelenik meg előbb.",
      },
    },
  ],
};
