import TagNewsSection from "@/components/TagNewsSection";

export default async function OktatasNewsPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="px-4">
          <div className="max-w-screen mx-auto">
            <TagNewsSection page={page} tag="Oktatás" basePath="/oktatas/hirek" />
          </div>
        </section>
      </main>
    </div>
  );
}

