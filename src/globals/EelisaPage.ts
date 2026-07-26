import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

const descriptionEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
  ],
});

export const EelisaPage: GlobalConfig = {
  slug: "eelisa-page",
  label: {
    singular: "EELISA oldal",
    plural: "EELISA oldal",
  },
  admin: {
    description:
      "Az EELISA oldal leírása, partneregyetemei, fontos linkjei és elérhetőségei.",
  },
  fields: [
    {
      name: "description_hu",
      type: "richText",
      required: true,
      label: "Leírás (magyar)",
      editor: descriptionEditor,
    },
    {
      name: "description_en",
      type: "richText",
      required: true,
      label: "Leírás (angol)",
      editor: descriptionEditor,
    },
    {
      name: "partnerUniversities",
      type: "array",
      label: "Partneregyetemek",
      labels: {
        singular: "Partneregyetem",
        plural: "Partneregyetemek",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Név",
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
    {
      name: "sidebarLinks",
      type: "array",
      label: "Aktuális linkek",
      labels: {
        singular: "Link",
        plural: "Linkek",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "label_hu",
          type: "text",
          required: true,
          label: "Címke (magyar)",
        },
        {
          name: "label_en",
          type: "text",
          required: true,
          label: "Címke (angol)",
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
    {
      name: "sidebarContacts",
      type: "array",
      label: "Elérhetőségek",
      labels: {
        singular: "Elérhetőség",
        plural: "Elérhetőségek",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Megjelenített címke",
        },
        {
          name: "email",
          type: "email",
          required: true,
          label: "E-mail-cím",
        },
      ],
    },
  ],
};
