import { getNews } from "@/lib/payload-cms";
import NewsCard from "./NewsCard";
import NewsPagination from "./NewsPagination";

export default async function NewsSection({ page = 1 }: { page?: number }) {
  const { docs: news, totalPages, page: currentPage } = await getNews({ page, limit: 6 });

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
      />
    </div>
  );
}