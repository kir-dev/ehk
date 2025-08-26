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
        useAsTitle: "name_hu",
    },
    fields: [
        {
            name: "name_hu",
            type: "text",
            required: true,
            label: "Engedély neve (magyar)",
        },
        {
            name: "name_en",
            type: "text",
            required: true,
            label: "Engedély neve (angol)",
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
            name: "displayText_hu",
            type: "text",
            required: false,
            label: "Megjelenítendő fájlnév (magyar)",
        },
        {
            name: "displayText_en",
            type: "text",
            required: false,
            label: "Megjelenítendő fájlnév (angol)",
        },
        {
            name: "file",
            type: "upload",
            relationTo: "media",
            required: false,
            label: "Fájl",
        },
    ],
};
