import TagNewsSection from "@/components/TagNewsSection";
import TagNewsHeader from "@/components/TagNewsHeader";

export default async function SzervezetNewsPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
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
              titleHu="Szervezet hírei"
              titleEn="Organization news"
              descHu="Az EHK és a szervezeti működéssel kapcsolatos hírek."
              descEn="News about EHK and organizational updates."
            />
            <TagNewsSection page={page} tag="EHK" basePath="/szervezet/hirek" />
          </div>
        </section>
      </main>
    </div>
  );
}
