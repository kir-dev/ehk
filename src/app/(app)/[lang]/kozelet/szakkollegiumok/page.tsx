export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getSpecializedColleges } from "@/lib/payload-cms";
import { notFound } from "next/navigation";

import { SpecializedCollegeCard } from "./SpecializedCollegeCard";

export default async function SpecializedCollegesPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const [dictionary, colleges] = await Promise.all([
    getDictionary(locale, "advanced_colleges"),
    getSpecializedColleges(),
  ]);
  const content = dictionary.advanced_colleges;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <PageHeader
          title={content.title}
          subtitle={
            <span className="flex flex-col gap-1">
              {content.description.slice(0, 2).map((paragraph) => (
                <span key={paragraph.slice(0, 40)}>{paragraph}</span>
              ))}
            </span>
          }
        />

        <main className="space-y-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          {colleges.map((college) => (
            <SpecializedCollegeCard
              key={college.id}
              college={college}
              locale={locale}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
