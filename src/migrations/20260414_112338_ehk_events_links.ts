import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ehk_events_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "ehk_events_links" ADD CONSTRAINT "ehk_events_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ehk_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ehk_events_links_order_idx" ON "ehk_events_links" USING btree ("_order");
  CREATE INDEX "ehk_events_links_parent_id_idx" ON "ehk_events_links" USING btree ("_parent_id");
  ALTER TABLE "ehk_events" DROP COLUMN "link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ehk_events_links" CASCADE;
  ALTER TABLE "ehk_events" ADD COLUMN "link" varchar;`)
}
