import { Accordion, AccordionEntry } from "@/components/common/Accordion";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { getEhkScholarships } from "@/lib/payload-cms";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const dynamic = "force-dynamic";

export default async function EHKScholarshipPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const isEn = validLang === "en";
  const dictionary = await getDictionary(validLang, "scholarships");
  const scholarships = await getEhkScholarships();
  const content = dictionary.scholarships.ehk;

  const entries: AccordionEntry[] = scholarships.map((item, index) => {
    const header = isEn
      ? item.title_en || item.title_hu
      : item.title_hu || item.title_en;
    const richTextContent = isEn
      ? item.content_en || item.content_hu
      : item.content_hu || item.content_en;

    return {
      id: String(item.id ?? index),
      header,
      content: (
        <div className="richtext max-w-none font-open-sans text-sm leading-[1.6] text-[#3d3d3d] md:text-base">
          <RichText data={richTextContent} />
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <PageHeader title={content.title} />
        <section className="rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          {entries.length === 0 ? (
            <EmptyState
              title={content.empty_title}
              description={content.empty_description}
            />
          ) : (
            <Accordion items={entries} />
          )}
        </section>
      </div>
    </div>
  );
}
