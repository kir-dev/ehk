import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
    labels: {
        singular: 'Fájl',
        plural: 'Fájlok',
    },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
