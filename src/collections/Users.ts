import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Felhasználó',
    plural: 'Felhasználók',
  },
  admin: {
    useAsTitle: 'email',
    description: 'Felhasználók, akik be tudnak jelentkezni az admin felületre.',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
