import type { CollectionConfig } from "payload";

export const PayoutPeriods: CollectionConfig = {
  slug: "payout-periods",
  labels: {
    singular: "Kifizetési időszak",
    plural: "Kifizetési időszakok",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "isActive"],
  },
  fields: [
    {
      name: "title",
      label: "Megnevezés",
      type: "text",
      required: true,
      admin: {
        placeholder: "pl. 2025/2026",
      },
    },
    {
      name: "isActive",
      label: "Aktív időszak",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Ha bepipálod, ez lesz az aktuálisan megjelenő időszak az oldalon. (A többi automatikusan inaktív lesz.)",
      },
    },
    {
      name: "autumnSemester",
      label: "Őszi félév",
      type: "group",
      fields: [
        {
          name: "payouts",
          label: "Kifizetések",
          type: "array",
          defaultValue: [
            {
              month_hu: "Szeptember",
              month_en: "September",
              date: "",
            },
            {
              month_hu: "Október",
              month_en: "October",
              date: "",
            },
            {
              month_hu: "November",
              month_en: "November",
              date: "",
            },
            {
              month_hu: "December",
              month_en: "December",
              date: "",
            },
            {
              month_hu: "Január",
              month_en: "January",
              date: "",
            },
          ],
          fields: [
            {
              name: "month_hu",
              label: "Hónap (magyar)",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. Szeptember",
              },
            },
            {
              name: "month_en",
              label: "Hónap (angol)",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. September",
              },
            },
            {
              name: "date",
              label: "Dátum",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. 2025.09.19.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "springSemester",
      label: "Tavaszi félév",
      type: "group",
      fields: [
        {
          name: "payouts",
          label: "Kifizetések",
          type: "array",
          defaultValue: [
            {
              month_hu: "Február",
              month_en: "February",
              date: "",
            },
            {
              month_hu: "Március",
              month_en: "March",
              date: "",
            },
            {
              month_hu: "Április",
              month_en: "April",
              date: "",
            },
            {
              month_hu: "Május",
              month_en: "May",
              date: "",
            },
            {
              month_hu: "Június",
              month_en: "June",
              date: "",
            },
            {
              month_hu: "Július",
              month_en: "July",
              date: "",
            },
            {
              month_hu: "Augusztus",
              month_en: "August",
              date: "",
            },
          ],
          fields: [
            {
              name: "month_hu",
              label: "Hónap (magyar)",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. Február",
              },
            },
            {
              name: "month_en",
              label: "Hónap (angol)",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. February",
              },
            },
            {
              name: "date",
              label: "Dátum",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. 2026.02.24.",
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (req.context?.preventRecursion) {
          return data;
        }

        if (operation === "create" || operation === "update") {
          if (data.isActive) {
            // Find other active periods and deactivate them
            const { payload } = req;
            const existingActivePeriods = await payload.find({
              collection: "payout-periods",
              where: {
                isActive: {
                  equals: true,
                },
                id: {
                  not_equals: originalDoc?.id,
                },
              },
            });

            if (existingActivePeriods.totalDocs > 0) {
              await Promise.all(
                existingActivePeriods.docs.map(async (doc) => {
                  await payload.update({
                    collection: "payout-periods",
                    id: doc.id,
                    data: {
                      isActive: false,
                    },
                    context: {
                      preventRecursion: true,
                    },
                  });
                }),
              );
            }
          }
        }
        return data;
      },
    ],
  },
};
