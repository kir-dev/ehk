import TagNewsSection from "@/components/news/TagNewsSection";
import TagNewsHeader from "@/components/news/TagNewsHeader";

export default async function KozeletNewsPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
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
              titleHu="Közélet hírei"
              titleEn="Community life news"
              descHu="A közösségi élettel, rendezvényekkel és szervezetekkel kapcsolatos hírek."
              descEn="News about community life, events and organizations."
            />
            <TagNewsSection page={page} tag="Közélet" basePath="/kozelet/hirek" />
          </div>
        </section>
      </main>
    </div>
  );
}
