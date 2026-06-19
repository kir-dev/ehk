import type { GlobalConfig } from "payload";
import {
  BlockquoteFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const AcademicScholarshipFAQ: GlobalConfig = {
  slug: "academic-scholarship-faq",
  label: {
    singular: "Tanulmányi ösztöndíj GYIK",
    plural: "Tanulmányi ösztöndíj GYIK",
  },
  admin: {
    description:
      "A Tanulmányi ösztöndíj oldal lenyíló (akkordeon) szekcióinak tartalma. A szekciók sorrendje húzással átrendezhető.",
  },
  fields: [
    {
      name: "accordionItems",
      type: "array",
      label: "Lenyíló szekciók",
      labels: {
        singular: "Szekció",
        plural: "Szekciók",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "header_hu",
          type: "text",
          required: true,
          label: "Cím (magyar)",
        },
        {
          name: "header_en",
          type: "text",
          required: true,
          label: "Cím (angol)",
        },
        {
          name: "content_hu",
          type: "richText",
          required: true,
          label: "Tartalom (magyar)",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              BlockquoteFeature(),
              FixedToolbarFeature(),
            ],
          }),
        },
        {
          name: "content_en",
          type: "richText",
          required: true,
          label: "Tartalom (angol)",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              BlockquoteFeature(),
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
};
