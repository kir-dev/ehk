import { Accordion, AccordionEntry } from "@/components/common/Accordion";
import { EmptyState } from "@/components/common/EmptyState";
import { getAcademicScholarshipFAQ } from "@/lib/payload-cms";
import { Locale } from "@/i18n-config";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface StudyScholarshipContentProps {
  lang: Locale;
  emptyTitle: string;
  emptyDescription: string;
}

export default async function StudyScholarshipContent({
  lang,
  emptyTitle,
  emptyDescription,
}: StudyScholarshipContentProps) {
  const items = await getAcademicScholarshipFAQ();
  const isEn = lang === "en";

  const entries: AccordionEntry[] = (items ?? []).map((item, index) => {
    const header = isEn
      ? item.header_en || item.header_hu
      : item.header_hu || item.header_en;
    const content = isEn
      ? item.content_en || item.content_hu
      : item.content_hu || item.content_en;

    return {
      id: item.id ?? String(index),
      header,
      content: (
        <div className="richtext study-scholarship-richtext font-open-sans text-sm md:text-base leading-[1.6] text-[#3d3d3d] max-w-none">
          <RichText data={content} />
        </div>
      ),
    };
  });

  return (
    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
      {entries.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <Accordion items={entries} />
      )}
    </div>
  );
}
