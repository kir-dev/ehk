import Link from "next/link";
import { getNews } from "@/lib/payload-cms";
import NewsCard from "./NewsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TagNewsEmptyState from "@/components/TagNewsEmptyState";

interface Props {
  page?: number
  tag: string
  basePath: string
}

export default async function TagNewsSection({ page = 1, tag, basePath }: Props) {
  const { docs: news, totalPages, page: currentPage } = await getNews({ page, limit: 6, tag });

  const makePageHref = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  if (!news || news.length === 0) {
    return <TagNewsEmptyState />
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 pb-4 lg:grid-cols-3 gap-4 md:gap-6">
        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2 pb-4">
          <Link
            href={makePageHref(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
            className={`px-3 py-1.5 rounded border text-sm ${currentPage === 1 ? 'pointer-events-none opacity-50 border-gray-200 text-gray-400' : 'hover:border-[#862633] hover:text-[#862633] border-gray-300 text-gray-700'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const isActive = p === currentPage;
            return (
              <Link
                key={p}
                href={makePageHref(p)}
                className={`px-3 py-1.5 rounded border text-sm ${isActive ? 'bg-[#862633] border-[#862633] text-white' : 'border-gray-300 text-gray-700 hover:border-[#862633] hover:text-[#862633]'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {p}
              </Link>
            );
          })}

          <Link
            href={makePageHref(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`px-3 py-1.5 rounded border text-sm ${currentPage === totalPages ? 'pointer-events-none opacity-50 border-gray-200 text-gray-400' : 'hover:border-[#862633] hover:text-[#862633] border-gray-300 text-gray-700'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </nav>
      )}
    </div>
  );
}
