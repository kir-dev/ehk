import { RelatedNews } from "@/components/related-news"
import { News } from "@/payload-types";
import { NewsDetailClientMain, NewsDetailClientSidebar } from "@/components/news-detail-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface NewsDetailProps {
    article: News
}

export function NewsDetail({ article }: NewsDetailProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Navigation */}
                <div className="mb-6">
                    <Button variant="ghost" asChild className="hover:bg-gray-100 hover:text-ehk-dark-red">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Vissza a hírekhez
                        </Link>
                    </Button>
                </div>
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
