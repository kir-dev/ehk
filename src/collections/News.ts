import type { CollectionConfig } from 'payload'
import {FixedToolbarFeature, lexicalEditor} from "@payloadcms/richtext-lexical";

export const News: CollectionConfig = {
    slug: 'news',
    labels: {
        singular: 'Hír',
        plural: 'Hírek',
    },
    admin: {
        useAsTitle: 'title',
        description: 'Hírek gyűjteménye',
    },
    fields: [
        {
            name: 'title',
            label: 'Cím',
            type: 'text',
            required: true,
        },
        {
            name: 'titleEng',
            label: 'Cím (angol)',
            type: 'text',
            required: true,
        },
        {
            name: 'shortDescription',
            label: 'Rövid leírás',
            type: 'group',
            fields: [
                {
                    name: 'text_hu',
                    label: 'Magyar',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'text_en',
                    label: 'Angol',
                    type: 'text',
                    required: true,
                },
            ],
            required: true,
        },
        {
            name: "description",
            type: "group",
            required: true,
            label: "Leírás",
            fields: [
                {
                    name: "text_hu",
                    type: "richText",
                    required: true,
                    label: "Leírás (magyar)",
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
                    label: "Leírás (angol)",
                    editor: lexicalEditor({
                        features: ({ defaultFeatures }) => [
                            ...defaultFeatures,
                            FixedToolbarFeature(),
                        ]
                    }),
                },
            ],
        },
        {
            name: 'date',
            label: 'Dátum',
            type: 'date',
            required: true,
        },
        {
            name: 'tags',
            label: 'Tagek',
            type: 'select',
            options: [
                { label: 'EHK', value: 'EHK' },
                { label: 'Oktatás', value: 'Oktatás' },
                { label: 'Juttatás', value: 'Juttatás' },
                { label: 'Kollégium', value: 'Kollégium' },
                { label: 'Pályázat', value: 'Pályázat' },
                { label: 'Sport', value: 'Sport' },
                { label: 'Külügy', value: 'Külügy' },
                { label: 'Rendezvények', value: 'Rendezvények' },
                { label: 'Közélet', value: 'Közélet' },
                { label: 'Felhívás', value: 'Felhívás' },
                { label: 'Beszámoló', value: 'Beszámoló' },
                { label: 'Tájékoztatás', value: 'Tájékoztatás' },
                { label: 'Kiemelt hír', value: 'Kiemelt hír' },
            ],
            hasMany: true,
            required: true,
        },
        {
            name: "files",
            label: "Fájlok",
            type: "array",
            fields: [
                {
                    name: "file",
                    label: "Fájl",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "description",
                    label: "Leírás",
                    type: "text",
                    required: false,
                },
            ],
        },
    ],
}
