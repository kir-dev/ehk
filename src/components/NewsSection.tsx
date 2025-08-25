import { getNews } from "@/lib/payload-cms";
import NewsCard from "./NewsCard";

export default async function NewsSection() {
  const news = await getNews();

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {news.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
  );
}