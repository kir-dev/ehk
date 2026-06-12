import type { CollectionConfig } from "payload";

export const UniversityPages: CollectionConfig = {
  slug: "university-pages",
  labels: {
    singular: "Egyetemi Oldal",
    plural: "Egyetemi Oldalak",
  },
  admin: {
    useAsTitle: "title_hu",
    description: "Egyetemi oldalak linkjeinek kezelése a láblécben.",
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
    },
    {
      name: "order",
      type: "number",
      required: true,
      label: "Sorrend",
      defaultValue: 0,
    },
  ],
};
