import { getNews } from "@/lib/payload-cms";
import NewsCard from "./NewsCard";

const news = await getNews();

export default function NewsSection() {
  console.log(news);
  return (
    <div className="flex flex-wrap gap-4">
      {news.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}
