import {CollectionConfig} from "payload";

export const Reminders: CollectionConfig = {
    slug: "reminders",
    labels : {
        singular: "Emlékeztető",
        plural: "Emlékeztetők",
    },
    admin: {
        description: "Emlékeztetők kezelése.",
        useAsTitle: "displayText",
    },
    fields: [
        {
            name: "date",
            type: "date",
            required: true,
            label: "Dátum",
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
        {
            name: "type",
            type: "select",
            options: [
                {
                    label: "EHK Emlékeztető",
                    value: "EHK",
                },
                {
                    label: "EHDK Emlékeztető",
                    value: "EHDK",
                },
            ],
            required: true,
            label: "Típus",
        },
    ],
};
