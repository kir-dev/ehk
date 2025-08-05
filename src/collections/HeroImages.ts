import type { CollectionConfig } from 'payload'

export const HeroImages: CollectionConfig = {
    slug: 'hero-images',
    labels: {
        singular: 'Nyitó kép',
        plural: 'Nyitó képek',
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
            name: 'picture',
            label: 'Kép',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}
