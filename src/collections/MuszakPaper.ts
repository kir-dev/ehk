import type { CollectionConfig } from 'payload'

export const MuszakPaper: CollectionConfig = {
    slug: 'muszak-paper',
    labels: {
        singular: 'MŰSZAK Hír',
        plural: 'MŰSZAK Hírek',
    },
    admin: {
        useAsTitle: 'title',
        description: 'MŰszak hírek, események és információk gyűjteménye.',
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
            name: 'date',
            label: 'Dátum',
            type: 'date',
            required: true,
        },
        {
            name: 'picture',
            label: 'Kép',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'link',
            label: 'Link',
            type: 'text',
            required: true,
        }
    ],
}
