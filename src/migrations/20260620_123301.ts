import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

type LexicalNode = Record<string, unknown>

const textNode = (text: string): LexicalNode => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (text: string): LexicalNode => ({
  type: 'paragraph',
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
  children: [textNode(text)],
})

const bulletList = (items: string[]): LexicalNode => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  children: items.map((text, i) => ({
    type: 'listitem',
    value: i + 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [textNode(text)],
  })),
})

const doc = (children: LexicalNode[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children,
  },
})

const scholarshipTypes = [
  {
    title_hu: 'Rendszeres szociális ösztöndíj',
    title_en: 'Regular Grant Based on Social Needs',
    targetAudience_hu: doc([
      paragraph('Rendszeres szociális ösztöndíjra az a hallgató pályázhat,'),
      bulletList([
        'aki teljes idejű alap-, mester-, osztatlan vagy doktori képzésben vesz részt és',
        'államilag támogatott vagy állami ösztöndíjas képzési formában vesz részt, vagy tanulmányait államilag támogatott vagy állami ösztöndíjas képzési formában kezdte meg és az adott szakon, szakképzésben megkezdett féléveinek száma alapján jogosult lenne államilag támogatott képzésben való részvételre.',
      ]),
    ]),
    targetAudience_en: doc([
      paragraph('A student may apply for the Regular Social Scholarship if they,'),
      bulletList([
        'are enrolled in a full-time bachelor’s, master’s, single-cycle, or doctoral program, and',
        'are studying in a state-funded or state scholarship-funded form of education, or began their studies in such a form and, based on the number of semesters started in the given program, would still be eligible to participate in a state-funded program.',
      ]),
    ]),
    description_hu: doc([
      paragraph(
        'A képzéseinek számától függetlenül egy pályázó egy pályázatot nyújthat be az adott ösztöndíjra.',
      ),
      paragraph(
        'A pályázatot a MŰEPER (Műegyetemi Egységes Pályázati és Elbírálási Rendszer) felületén lehet leadni a pályázási időszakban.',
      ),
    ]),
    description_en: doc([
      paragraph(
        'Regardless of the number of programs they are enrolled in, each applicant may submit only one application for this scholarship.',
      ),
      paragraph(
        'The application must be submitted through the MŰEPER (Unified Application and Evaluation System of the Budapest University of Technology and Economics) platform during the application period.',
      ),
    ]),
    actionLink: 'https://ehk.bme.hu/eszb',
  },
  {
    title_hu: 'Rendkívüli szociális ösztöndíj',
    title_en: 'Exceptional Grant Based on Social Needs',
    targetAudience_hu: doc([
      paragraph(
        'A Rendkívüli szociális ösztöndíjra azon hallgatóknak van lehetősége pályázni, akik váratlan esemény bekövetkeztében szociálisan rászorulóvá váltak, akiknek szociális helyzetében váratlan romlás történt.',
      ),
    ]),
    targetAudience_en: doc([
      paragraph(
        'Students who have become socially disadvantaged due to an unexpected event, or whose social situation has unexpectedly deteriorated, are eligible to apply for the Exceptional Social Scholarship.',
      ),
    ]),
    description_hu: doc([
      paragraph(
        'Az ösztöndíj egy egyszeri juttatást jelent. A hallgatónak lehetősége van egy félévben több pályázat leadására is, amennyiben több esemény is indokolja ezt, de eseményenként csak egyszer lehet pályázni. A pályázatot a MŰEPER (Műegyetemi Egységes Pályázati és Elbírálási Rendszer) felületén lehet leadni.',
      ),
      paragraph(
        'A pályázat leadása előtt érdemes egyeztetni a mindenkori Egyetemi Szociális Bizottság elnökével a megfelelő dokumentumok beszerzésével kapcsolatban.',
      ),
    ]),
    description_en: doc([
      paragraph(
        'The scholarship is a one-time grant. Students may submit multiple applications within a semester if several events justify it, but only one application may be submitted per event. The application must be submitted through the MŰEPER (Unified Application and Evaluation System of the Budapest University of Technology and Economics) platform.',
      ),
      paragraph(
        'Before submitting the application, it is recommended to consult with the current president of the University Social Committee regarding the required documents.',
      ),
    ]),
    actionLink: 'https://ehk.bme.hu/eszb',
  },
]

const sidebarLinks = [
  {
    title_hu: 'MŰEPER',
    title_en: 'MŰEPER',
    url: 'https://mueper.bme.hu',
  },
  {
    title_hu: 'ESZB',
    title_en: 'ESZB',
    url: 'https://ehk.bme.hu/eszb',
  },
]

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "social_scholarships_faq_scholarship_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_hu" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"targetaudience_hu" jsonb NOT NULL,
  	"targetaudience_en" jsonb NOT NULL,
  	"description_hu" jsonb NOT NULL,
  	"description_en" jsonb NOT NULL,
  	"action_link" varchar NOT NULL
  );
  
  CREATE TABLE "social_scholarships_faq_sidebar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_hu" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "social_scholarships_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "social_scholarships_faq_scholarship_types" ADD CONSTRAINT "social_scholarships_faq_scholarship_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_scholarships_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_scholarships_faq_sidebar_links" ADD CONSTRAINT "social_scholarships_faq_sidebar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_scholarships_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "social_scholarships_faq_scholarship_types_order_idx" ON "social_scholarships_faq_scholarship_types" USING btree ("_order");
  CREATE INDEX "social_scholarships_faq_scholarship_types_parent_id_idx" ON "social_scholarships_faq_scholarship_types" USING btree ("_parent_id");
  CREATE INDEX "social_scholarships_faq_sidebar_links_order_idx" ON "social_scholarships_faq_sidebar_links" USING btree ("_order");
  CREATE INDEX "social_scholarships_faq_sidebar_links_parent_id_idx" ON "social_scholarships_faq_sidebar_links" USING btree ("_parent_id");`)

  await payload.updateGlobal({
    slug: 'social-scholarships-faq',
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scholarshipTypes: scholarshipTypes as any,
      sidebarLinks,
    },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "social_scholarships_faq_scholarship_types" CASCADE;
  DROP TABLE "social_scholarships_faq_sidebar_links" CASCADE;
  DROP TABLE "social_scholarships_faq" CASCADE;`)
}
