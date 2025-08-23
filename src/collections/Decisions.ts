import type {CollectionConfig} from "payload";

export const Decisions: CollectionConfig = {
    slug: "decisions",
    labels : {
        singular: "Határozat",
        plural: "Határozatok",
    },
    admin: {
        description: "Határozatok kezelése.",
        useAsTitle: "displayText",
    },
    fields: [
        {
            name: "text_hu",
            type: "text",
            required: true,
            label: "Határozat szövege (magyar)",
        },
        {
            name: "text_en",
            type: "text",
            required: true,
            label: "Határozat szövege (angol)",
        },
        {
            name: "displayText",
            type: "text",
            required: true,
            label: "Megjelenítendő fájlnév",
        },
        {
            name: "file",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "Fájl",
        },
    ],
};
