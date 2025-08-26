import TagNewsSection from "@/components/TagNewsSection";
import TagNewsHeader from "@/components/TagNewsHeader";

export default async function SportNewsPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            <TagNewsHeader
              titleHu="Sport hírei"
              titleEn="Sports news"
              descHu="Sporttal kapcsolatos hírek és információk."
              descEn="News and updates about sports."
            />
            <TagNewsSection page={page} tag="Sport" basePath="/sport/hirek" />
          </div>
        </section>
      </main>
    </div>
  );
}
