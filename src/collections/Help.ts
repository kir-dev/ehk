import type { CollectionConfig } from "payload";

export const Help: CollectionConfig = {
  slug: "help",
  labels: {
    singular: "Segédlet",
    plural: "Segédletek",
  },
  fields: [
    {
      name: "title_hu",
      type: "text",
      required: true,
    },
    {
      name: "title_en",
      type: "text",
      required: true,
    },
    {
      name: "description_hu",
      type: "text",
      required: true,
    },
    {
      name: "description_en",
      type: "text",
      required: true,
    },
    {
      name: "files",
      type: "array",
      fields: [
        {
          name: "displayName_hu",
          type: "text",
          required: true,
        },
        {
          name: "file_hu",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "displayName_en",
          type: "text",
        },
        {
          name: "file_en",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
