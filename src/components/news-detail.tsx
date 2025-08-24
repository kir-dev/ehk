import { RelatedNews } from "@/components/related-news"
import { News } from "@/payload-types";
import { NewsDetailClientMain, NewsDetailClientSidebar } from "@/components/news-detail-client";
import BackNav from "@/components/BackNav";

interface NewsDetailProps {
    article: News
}

export function NewsDetail({ article }: NewsDetailProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <BackNav />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 col-start-1">
                        <NewsDetailClientMain article={article} />
                    </div>
                    <div className="col-span-1 col-start-3">
                        <NewsDetailClientSidebar article={article} />
                        <RelatedNews currentArticle={article} />
                    </div>
                </div>
            </div>
        </div>
    )
}
