import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  labels: {
    singular: 'Klub',
    plural: 'Klubok',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'order'],
  },
  fields: [
    {
      name: 'title',
      label: 'Név',
      type: 'text',
      required: true,
      admin: {
        description: 'A klub neve',
      },
    },
    {
      name: 'description',
      label: 'Leírás',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text_hu',
          label: 'Leírás (magyar)',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
        {
          name: 'text_en',
          label: 'Leírás (angol)',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'location',
      label: 'Helyszín',
      type: 'text',
      required: false,
      admin: {
        description: 'Cím vagy helyszín, pl.: Kármán Tódor Kollégium',
      },
    },
    {
      name: 'openingHours',
      label: 'Nyitvatartás',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'text_hu',
          label: 'Nyitvatartás (magyar)',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
        {
          name: 'text_en',
          label: 'Nyitvatartás (angol)',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'image',
      label: 'Kép',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'order',
      label: 'Sorrend',
      type: 'number',
      required: false,
      admin: {
        description: 'Megjelenítési sorrend (pl. 1 az első)',
      },
    },
    {
      name: 'link',
      label: 'Link',
      type: 'text',
      required: false,
      admin: {
        description: 'Opcionális link a klub weboldalához vagy közösségi oldalához',
      },
    },
  ],
};
