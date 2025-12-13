import { getNews } from "@/lib/payload-cms";
import NewsCard from "./NewsCard";
import TagNewsEmptyState from "@/components/TagNewsEmptyState";
import NewsPagination from "./NewsPagination";

interface Props {
  page?: number
  tag: string
  basePath: string
}

export default async function TagNewsSection({ page = 1, tag, basePath }: Props) {
  const { docs: news, totalPages, page: currentPage } = await getNews({ page, limit: 6, tag });

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

      <NewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
        queryKey="page"
      />
    </div>
  );
}
