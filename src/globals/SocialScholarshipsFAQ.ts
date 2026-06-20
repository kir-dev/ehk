import type { GlobalConfig } from "payload";
import {
  BlockquoteFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    BlockquoteFeature(),
    FixedToolbarFeature(),
  ],
});

export const SocialScholarshipsFAQ: GlobalConfig = {
  slug: "social-scholarships-faq",
  label: {
    singular: "Szociális ösztöndíj tartalom",
    plural: "Szociális ösztöndíj tartalom",
  },
  admin: {
    description:
      "A Szociális ösztöndíj oldal kártyáinak és fontos linkjeinek szerkeszthető tartalma.",
  },
  fields: [
    {
      name: "scholarshipTypes",
      type: "array",
      label: "Ösztöndíj típusok",
      labels: {
        singular: "Ösztöndíj típus",
        plural: "Ösztöndíj típusok",
      },
      admin: {
        initCollapsed: true,
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
          name: "targetAudience_hu",
          type: "richText",
          required: true,
          label: "Ki pályázhat? (magyar)",
          editor: richTextEditor,
        },
        {
          name: "targetAudience_en",
          type: "richText",
          required: true,
          label: "Who can apply? (angol)",
          editor: richTextEditor,
        },
        {
          name: "description_hu",
          type: "richText",
          required: true,
          label: "Leírás (magyar)",
          editor: richTextEditor,
        },
        {
          name: "description_en",
          type: "richText",
          required: true,
          label: "Leírás (angol)",
          editor: richTextEditor,
        },
        {
          name: "actionLink",
          type: "text",
          required: true,
          label: "ESZB gomb URL",
          admin: {
            placeholder: "https://...",
          },
        },
      ],
    },
    {
      name: "sidebarLinks",
      type: "array",
      label: "Fontos linkek",
      labels: {
        singular: "Fontos link",
        plural: "Fontos linkek",
      },
      admin: {
        initCollapsed: true,
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
          name: "url",
          type: "text",
          required: true,
          label: "URL",
          admin: {
            placeholder: "https://...",
          },
        },
      ],
    },
  ],
};
