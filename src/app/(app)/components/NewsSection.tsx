import NewsCard from "@/components/news/NewsCard";
import NewsPagination from "@/components/news/NewsPagination";
import { getNews } from "@/lib/payload-cms";
import { EmptyState } from "@/components/common/EmptyState";

export default async function NewsSection({
  page = 1,
  basePath = "/",
  tag,
  dictionary
}: Readonly<{
  page?: number;
  basePath?: string;
  tag?: string;
  dictionary: {
    news: {
      no_results: string;
      no_news_category: string;
    };
  };
}>) {
  const { docs: news, totalPages, page: currentPage } = await getNews({ page, limit: 6, tag });

  if (news.length === 0) {
    return (
      <EmptyState
        title={dictionary.news.no_results}
        description={dictionary.news.no_news_category}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 pb-4 lg:grid-cols-3 gap-4 md:gap-6">
        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} activeTag={tag} />
        ))}
      </div>

      <NewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}