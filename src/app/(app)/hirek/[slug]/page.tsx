import { NewsDetail } from "@/components/news-detail"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/payload-cms";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const id = Number(slug)
    if (!Number.isFinite(id)) {
        notFound()
    }

    const article = await getNewsById(id)

    if (!article) {
        notFound()
    }

    return <NewsDetail article={article} />
}
