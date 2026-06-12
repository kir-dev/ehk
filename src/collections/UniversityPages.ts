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
      validate: (val: string | null | undefined) => {
        if (!val) return 'Az URL megadása kötelező.';
        try {
          const parsed = new URL(val);
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return 'A linknek érvényes HTTP vagy HTTPS URL-nek kell lennie (pl. https://example.com).';
          }
          return true;
        } catch {
          return 'Érvénytelen URL formátum.';
        }
      },
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
