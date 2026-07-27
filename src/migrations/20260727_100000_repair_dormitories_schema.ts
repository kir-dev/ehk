import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "dormitories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "cover_image_id" integer,
      "external_link" varchar,
      "description_hu" jsonb,
      "description_en" jsonb,
      "capacity" numeric,
      "address_hu" varchar,
      "address_en" varchar,
      "map_url" varchar,
      "roominfo_hu" varchar,
      "roominfo_en" varchar,
      "targetaudience_hu" varchar,
      "targetaudience_en" varchar,
      "order" numeric DEFAULT 0 NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'room_info_hu'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'roominfo_hu'
      ) THEN
        ALTER TABLE "dormitories"
          RENAME COLUMN "room_info_hu" TO "roominfo_hu";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'room_info_en'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'roominfo_en'
      ) THEN
        ALTER TABLE "dormitories"
          RENAME COLUMN "room_info_en" TO "roominfo_en";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'target_audience_hu'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'targetaudience_hu'
      ) THEN
        ALTER TABLE "dormitories"
          RENAME COLUMN "target_audience_hu" TO "targetaudience_hu";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'target_audience_en'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories'
          AND column_name = 'targetaudience_en'
      ) THEN
        ALTER TABLE "dormitories"
          RENAME COLUMN "target_audience_en" TO "targetaudience_en";
      END IF;
    END $$;

    ALTER TABLE "dormitories"
      ADD COLUMN IF NOT EXISTS "description_hu" jsonb,
      ADD COLUMN IF NOT EXISTS "description_en" jsonb,
      ADD COLUMN IF NOT EXISTS "capacity" numeric,
      ADD COLUMN IF NOT EXISTS "address_hu" varchar,
      ADD COLUMN IF NOT EXISTS "address_en" varchar,
      ADD COLUMN IF NOT EXISTS "map_url" varchar,
      ADD COLUMN IF NOT EXISTS "roominfo_hu" varchar,
      ADD COLUMN IF NOT EXISTS "roominfo_en" varchar,
      ADD COLUMN IF NOT EXISTS "targetaudience_hu" varchar,
      ADD COLUMN IF NOT EXISTS "targetaudience_en" varchar;

    ALTER TABLE "dormitories"
      ALTER COLUMN "cover_image_id" DROP NOT NULL;

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "dormitories_id" integer;

    CREATE TABLE IF NOT EXISTS "dormitories_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "categoryname_hu" varchar NOT NULL,
      "categoryname_en" varchar
    );

    CREATE TABLE IF NOT EXISTS "dormitories_gallery_images" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories_gallery'
          AND column_name = 'category_name_hu'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories_gallery'
          AND column_name = 'categoryname_hu'
      ) THEN
        ALTER TABLE "dormitories_gallery"
          RENAME COLUMN "category_name_hu" TO "categoryname_hu";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories_gallery'
          AND column_name = 'category_name_en'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'dormitories_gallery'
          AND column_name = 'categoryname_en'
      ) THEN
        ALTER TABLE "dormitories_gallery"
          RENAME COLUMN "category_name_en" TO "categoryname_en";
      END IF;
    END $$;

    ALTER TABLE "dormitories_gallery"
      ADD COLUMN IF NOT EXISTS "categoryname_hu" varchar,
      ADD COLUMN IF NOT EXISTS "categoryname_en" varchar;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'dormitories_cover_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "dormitories"
          ADD CONSTRAINT "dormitories_cover_image_id_media_id_fk"
          FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'payload_locked_documents_rels_dormitories_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_dormitories_fk"
          FOREIGN KEY ("dormitories_id") REFERENCES "public"."dormitories"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'dormitories_gallery_parent_id_fk'
      ) THEN
        ALTER TABLE "dormitories_gallery"
          ADD CONSTRAINT "dormitories_gallery_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."dormitories"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'dormitories_gallery_images_parent_id_fk'
      ) THEN
        ALTER TABLE "dormitories_gallery_images"
          ADD CONSTRAINT "dormitories_gallery_images_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."dormitories_gallery"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'dormitories_gallery_images_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "dormitories_gallery_images"
          ADD CONSTRAINT "dormitories_gallery_images_image_id_media_id_fk"
          FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "dormitories_slug_idx"
      ON "dormitories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "dormitories_cover_image_idx"
      ON "dormitories" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "dormitories_order_idx"
      ON "dormitories" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "dormitories_updated_at_idx"
      ON "dormitories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "dormitories_created_at_idx"
      ON "dormitories" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_dormitories_id_idx"
      ON "payload_locked_documents_rels" USING btree ("dormitories_id");
    CREATE INDEX IF NOT EXISTS "dormitories_gallery_order_idx"
      ON "dormitories_gallery" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "dormitories_gallery_parent_id_idx"
      ON "dormitories_gallery" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_order_idx"
      ON "dormitories_gallery_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_parent_id_idx"
      ON "dormitories_gallery_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dormitories_gallery_images_image_idx"
      ON "dormitories_gallery_images" USING btree ("image_id");
  `);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: this migration restores objects owned by earlier migrations.
}
