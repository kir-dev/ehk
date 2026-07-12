import type { CollectionConfig } from "payload";

const validateOptionalUrl = (val: string | null | undefined) => {
  if (!val) return true;

  try {
    const parsed = new URL(val);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "A linknek érvényes HTTP vagy HTTPS URL-nek kell lennie (pl. https://example.com).";
    }
    return true;
  } catch {
    return "Érvénytelen URL formátum.";
  }
};

const validateSlug = (val: string | null | undefined) => {
  if (!val) return true;

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val)
    ? true
    : "A slug csak kisbetűket, számokat és elválasztó kötőjeleket tartalmazhat.";
};

export const Dormitories: CollectionConfig = {
  slug: "dormitories",
  labels: {
    singular: "Kollégium",
    plural: "Kollégiumok",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
    description: "A kollégium bemutató oldalon megjelenő kollégiumok kezelése.",
  },
  fields: [
    {
      name: "name",
      label: "Név",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      validate: validateSlug,
      admin: {
        description: "Útvonalhoz használt azonosító, pl. baross, sch.",
      },
    },
    {
      name: "coverImage",
      label: "Borítókép",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "externalLink",
      label: "Külső link",
      type: "text",
      required: false,
      admin: {
        description: "Opcionális külső oldal, ahová a Részletek gomb navigál.",
      },
      validate: validateOptionalUrl,
    },
    {
      name: "order",
      label: "Sorrend",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};
