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
          fields: [
            {
              name: "month",
              label: "Hónap",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. Szeptember",
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
          fields: [
            {
              name: "month",
              label: "Hónap",
              type: "text",
              required: true,
              admin: {
                placeholder: "pl. Február",
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
