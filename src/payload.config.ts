import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Decisions } from "@/collections/Decisions";
import { Events } from "@/collections/Events";
import { HeroImages } from "@/collections/HeroImages";
import { MuszakPaper } from "@/collections/MuszakPaper";
import { News } from "@/collections/News";
import { Permissions } from "@/collections/Permissions";
import { Regulations } from "@/collections/Regulations";
import { Reminders } from "@/collections/Reminders";
import { Representatives } from "@/collections/Representatives";
import { en } from "@payloadcms/translations/languages/en";
import { hu } from "@payloadcms/translations/languages/hu";
import { Help } from "./collections/Help";
import { Media } from "./collections/Media";
import { PayoutPeriods } from "./collections/PayoutPeriods";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  i18n: {
    supportedLanguages: { en, hu },
    fallbackLanguage: "hu",
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
    MuszakPaper,
    Decisions,
    Events,
    Permissions,
    Regulations,
    Help,
    PayoutPeriods,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString:
        process.env.DATABASE_URI ?? process.env.DATABASE_URL ?? "",
    },
    migrationDir: "./src/migrations",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: true,
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
      clientUploads: true,
    }),
  ],
});
