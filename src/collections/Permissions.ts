import type {CollectionConfig} from "payload";
import {FixedToolbarFeature, lexicalEditor} from "@payloadcms/richtext-lexical";

export const Permissions: CollectionConfig = {
    slug: "permissions",
    labels : {
        singular: "Engedély",
        plural: "Engedélyek",
    },
    admin: {
        description: "Engedélyek kezelése.",
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Engedély neve",
        },
        {
            name: "text_hu",
            type: "richText",
            required: true,
            label: "Engedély leírása (magyar)",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            }),
        },
        {
            name: "text_en",
            type: "richText",
            required: true,
            label: "Engedély leírása (angol)",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            }),
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
