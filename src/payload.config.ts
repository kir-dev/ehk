// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {Representatives} from "@/collections/Representatives";
import {en} from "@payloadcms/translations/languages/en";
import {hu} from "@payloadcms/translations/languages/hu";
import {Reminders} from "@/collections/Reminders";
import {News} from "@/collections/News";
import {HeroImages} from "@/collections/HeroImages";
import {MuszakPaper} from "@/collections/MuszakPaper";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { en, hu },
    fallbackLanguage: 'en',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
      Users,
      Media,
      Representatives,
      Reminders,
      News,
      HeroImages,
      MuszakPaper
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: './src/migrations',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})