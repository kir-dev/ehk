import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Esemény",
    plural: "Események",
  },
  admin: {
    useAsTitle: "title_hu",
    description:
      "Események gyűjteménye - egy napos és többszörös napos eseményekhez",
    defaultColumns: ["title_hu", "date.startDate", "date.endDate", "createdAt"],
  },
  fields: [
    {
      name: "title_hu",
      label: "Cím (magyar)",
      type: "text",
      required: true,
    },
    {
      name: "title_en",
      label: "Cím (angol)",
      type: "text",
      required: true,
    },
    {
      name: "shortDescription",
      label: "Rövid leírás",
      type: "group",
      fields: [
        {
          name: "description_hu",
          label: "Rövid leírás (magyar)",
          type: "text",
          required: true,
        },
        {
          name: "description_en",
          label: "Rövid leírás (angol)",
          type: "text",
          required: true,
        },
      ],
      required: true,
    },
    {
      name: "date",
      label: "Dátum",
      type: "group",
      fields: [
        {
          name: "startDate",
          label: "Kezdő dátum",
          type: "date",
          required: true,
        },
        {
          name: "endDate",
          label: "Záró dátum",
          type: "date",
          required: true,
          admin: {
            description:
              "Ha egy napos esemény, akkor ugyanaz legyen mint a kezdő dátum",
          },
        },
      ],
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Automatically set endDate to startDate if not provided
        if (data?.date?.startDate && !data?.date?.endDate) {
          data.date.endDate = data.date.startDate;
        }

        return data;
      },
    ],
  },
};
