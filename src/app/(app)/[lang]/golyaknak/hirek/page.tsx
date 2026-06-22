export const dynamic = "force-dynamic";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { LanguageProvider, Lang } from "@/components/common/LanguageProvider";
import TagNewsSection from "@/components/news/TagNewsSection";
import TagNewsHeader from "@/components/news/TagNewsHeader";

export default async function GolyaknakNewsPage({
  searchParams, params }: { searchParams?: Promise<Record<string, string | string[] | undefined>>, params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale, 'news');
  
  const sp = await searchParams;
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  return (
    <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            <TagNewsHeader
              titleHu="Gólyáknak hírei"
              titleEn="Freshmen news"
              descHu="Információk és hírek gólyáknak."
              descEn="Information and news for freshmen."
            />
            {/* Assumption: use the 'Tájékoztatás' tag for freshmen-related news */}
            <TagNewsSection page={page} tag="Tájékoztatás" basePath="/golyaknak/hirek" />
          </div>
        </section>
      </main>
    </div>
      </LanguageProvider>
  );
}

