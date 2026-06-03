import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { LanguageProvider, Lang } from "@/components/common/LanguageProvider";
import TagNewsSection from "@/components/news/TagNewsSection";
import TagNewsHeader from "@/components/news/TagNewsHeader";

export default async function InternationalNewsPage({
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
              titleHu="Nemzetközi hírek"
              titleEn="International news"
              descHu="Nemzetközi hallgatóknak és ügyeknek szóló hírek."
              descEn="News for international students and matters."
            />
            <TagNewsSection page={page} tag="International" basePath="/international/hirek" />
          </div>
        </section>
      </main>
    </div>
      </LanguageProvider>
  );
}
