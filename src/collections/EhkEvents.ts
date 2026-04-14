import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const EhkEvents: CollectionConfig = {
  slug: 'ehk-events',
  labels: {
    singular: 'Rendezvény',
    plural: 'Rendezvények',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    {
      name: 'title',
      label: 'Cím',
      type: 'text',
      required: true,
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
      name: 'images',
      label: 'Képek',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Kép',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      label: 'Sorrend',
      type: 'number',
      required: false,
    },
    {
      name: 'links',
      label: 'Linkek',
      type: 'array',
      required: false,
      admin: {
        description: 'Eseményhez tartozó weboldal, Facebook, vagy más hivatkozások.',
      },
      fields: [
        {
          name: 'label',
          label: 'Címke (pl. Facebook, Weblap)',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          validate: (val: string | null | undefined) => {
            if (!val) return true;
            try {
              const parsed = new URL(val);
              if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
                return 'A linknek érvényes HTTP vagy HTTPS URL-nek kell lennie (pl. https://example.com).';
              }
              return true;
            } catch {
              return 'Érvénytelen URL formátum.';
            }
          },
        },
      ],
    },
  ],
};
