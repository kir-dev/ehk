import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_representatives_faculty" AS ENUM('ÉMK', 'GPK', 'ÉPK', 'VBK', 'VIK', 'GTK', 'TTK', 'KJK');
  CREATE TYPE "public"."enum_reminders_type" AS ENUM('EHK', 'EHDK');
  CREATE TYPE "public"."enum_news_tags" AS ENUM('EHK', 'Oktatás', 'Juttatás', 'Kollégium', 'Pályázat', 'Sport', 'Külügy', 'Rendezvények', 'Közélet', 'Felhívás', 'Beszámoló', 'Tájékoztatás', 'Kiemelt hír');
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "representatives_position" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position_hu" varchar NOT NULL,
  	"position_en" varchar NOT NULL
  );
  
  CREATE TABLE "representatives_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "representatives_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL,
  	"title_hu" varchar NOT NULL,
  	"title_en" varchar
  );
  
  CREATE TABLE "representatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer,
  	"introduction_text_hu" jsonb NOT NULL,
  	"introduction_text_en" jsonb NOT NULL,
  	"faculty" "enum_representatives_faculty",
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reminders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"display_text" varchar NOT NULL,
  	"file_id" integer NOT NULL,
  	"type" "enum_reminders_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_news_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_eng" varchar NOT NULL,
  	"short_description_text_hu" varchar NOT NULL,
  	"short_description_text_en" varchar NOT NULL,
  	"description_text_hu" jsonb NOT NULL,
  	"description_text_en" jsonb NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "muszak_paper" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_eng" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"picture_id" integer NOT NULL,
  	"link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"representatives_id" integer,
  	"reminders_id" integer,
  	"news_id" integer,
  	"hero_images_id" integer,
  	"muszak_paper_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "representatives_position" ADD CONSTRAINT "representatives_position_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."representatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "representatives_emails" ADD CONSTRAINT "representatives_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."representatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "representatives_files" ADD CONSTRAINT "representatives_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "representatives_files" ADD CONSTRAINT "representatives_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."representatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "representatives" ADD CONSTRAINT "representatives_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reminders" ADD CONSTRAINT "reminders_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_tags" ADD CONSTRAINT "news_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_images" ADD CONSTRAINT "hero_images_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "muszak_paper" ADD CONSTRAINT "muszak_paper_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_representatives_fk" FOREIGN KEY ("representatives_id") REFERENCES "public"."representatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reminders_fk" FOREIGN KEY ("reminders_id") REFERENCES "public"."reminders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_images_fk" FOREIGN KEY ("hero_images_id") REFERENCES "public"."hero_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_muszak_paper_fk" FOREIGN KEY ("muszak_paper_id") REFERENCES "public"."muszak_paper"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "representatives_position_order_idx" ON "representatives_position" USING btree ("_order");
  CREATE INDEX "representatives_position_parent_id_idx" ON "representatives_position" USING btree ("_parent_id");
  CREATE INDEX "representatives_emails_order_idx" ON "representatives_emails" USING btree ("_order");
  CREATE INDEX "representatives_emails_parent_id_idx" ON "representatives_emails" USING btree ("_parent_id");
  CREATE INDEX "representatives_files_order_idx" ON "representatives_files" USING btree ("_order");
  CREATE INDEX "representatives_files_parent_id_idx" ON "representatives_files" USING btree ("_parent_id");
  CREATE INDEX "representatives_files_file_idx" ON "representatives_files" USING btree ("file_id");
  CREATE INDEX "representatives_picture_idx" ON "representatives" USING btree ("picture_id");
  CREATE INDEX "representatives_updated_at_idx" ON "representatives" USING btree ("updated_at");
  CREATE INDEX "representatives_created_at_idx" ON "representatives" USING btree ("created_at");
  CREATE INDEX "reminders_file_idx" ON "reminders" USING btree ("file_id");
  CREATE INDEX "reminders_updated_at_idx" ON "reminders" USING btree ("updated_at");
  CREATE INDEX "reminders_created_at_idx" ON "reminders" USING btree ("created_at");
  CREATE INDEX "news_tags_order_idx" ON "news_tags" USING btree ("order");
  CREATE INDEX "news_tags_parent_idx" ON "news_tags" USING btree ("parent_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "hero_images_picture_idx" ON "hero_images" USING btree ("picture_id");
  CREATE INDEX "hero_images_updated_at_idx" ON "hero_images" USING btree ("updated_at");
  CREATE INDEX "hero_images_created_at_idx" ON "hero_images" USING btree ("created_at");
  CREATE INDEX "muszak_paper_picture_idx" ON "muszak_paper" USING btree ("picture_id");
  CREATE INDEX "muszak_paper_updated_at_idx" ON "muszak_paper" USING btree ("updated_at");
  CREATE INDEX "muszak_paper_created_at_idx" ON "muszak_paper" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_representatives_id_idx" ON "payload_locked_documents_rels" USING btree ("representatives_id");
  CREATE INDEX "payload_locked_documents_rels_reminders_id_idx" ON "payload_locked_documents_rels" USING btree ("reminders_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_hero_images_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_images_id");
  CREATE INDEX "payload_locked_documents_rels_muszak_paper_id_idx" ON "payload_locked_documents_rels" USING btree ("muszak_paper_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "representatives_position" CASCADE;
  DROP TABLE "representatives_emails" CASCADE;
  DROP TABLE "representatives_files" CASCADE;
  DROP TABLE "representatives" CASCADE;
  DROP TABLE "reminders" CASCADE;
  DROP TABLE "news_tags" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "hero_images" CASCADE;
  DROP TABLE "muszak_paper" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_representatives_faculty";
  DROP TYPE "public"."enum_reminders_type";
  DROP TYPE "public"."enum_news_tags";`)
}
