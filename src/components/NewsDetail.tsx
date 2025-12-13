import { RelatedNews } from "@/components/RelatedNews"
import { News } from "@/payload-types";
import { NewsDetailClientMain, NewsDetailClientSidebar } from "@/components/NewsDetailClient";
import BackNav from "@/components/BackNav";

interface NewsDetailProps {
    article: News
}

export function NewsDetail({ article }: NewsDetailProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 md:py-8">
                <BackNav />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                        <NewsDetailClientMain article={article} />
                    </div>
                    <div className="md:col-span-1">
                        <NewsDetailClientSidebar article={article} />
                        <RelatedNews currentArticle={article} />
                    </div>
                </div>
            </div>
        </div>
    )
}
