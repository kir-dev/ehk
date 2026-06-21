import { NewsDetailMain } from "@/app/(app)/[lang]/hirek/[slug]/components/NewsDetailMain";
import { NewsDetailSidebar } from "@/app/(app)/[lang]/hirek/[slug]/components/NewsDetailSidebar";
import { RelatedNews } from "@/app/(app)/[lang]/hirek/[slug]/components/RelatedNews";
import { News } from "@/payload-types";

interface NewsDetailProps {
    article: News
}

export function NewsDetail({ article }: NewsDetailProps) {
    return (
        <div className="min-h-screen bg-[#f9f4f0]">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 md:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 lg:items-start">
                    <div className="min-w-0 flex-1">
                        <NewsDetailMain article={article} />
                    </div>
                    <aside className="flex flex-col gap-4 lg:w-[343px] lg:shrink-0">
                        <NewsDetailSidebar article={article} />
                        <RelatedNews currentArticle={article} />
                    </aside>
                </div>
            </div>
        </div>
    )
}
