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
            name: 'shortDescription',
            label: 'Rövid leírás',
            type: 'group',
            fields: [
                {
                    name: 'text_hu',
                    label: 'Magyar',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'text_en',
                    label: 'Angol',
                    type: 'textarea',
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
                { label: 'EHK', value: 'ehk' },
                { label: 'Oktatás', value: 'education' },
                { label: 'Juttatás', value: 'allowance' },
                { label: 'Kollégium', value: 'dormitory' },
                { label: 'Pályázat', value: 'application' },
                { label: 'Sport', value: 'sport' },
                { label: 'Külügy', value: 'foreign' },
                { label: 'Rendezvények', value: 'events' },
                { label: 'Közélet', value: 'public' },
                { label: 'Felhívás', value: 'announcement' },
                { label: 'Beszámoló', value: 'report' },
                { label: 'Tájékoztatás', value: 'information' },
                { label: 'Kiemelt hír', value: 'bignews' },
            ],
            hasMany: true,
            required: true,
        },
    ],
}
