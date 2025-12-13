import {getRelatedNews} from "@/lib/payload-cms";
import {News} from "@/payload-types";
import { RelatedNewsClient } from "@/app/(app)/[lang]/hirek/[slug]/components/RelatedNewsClient";

interface RelatedNewsProps {
    currentArticle: News
}

export async function RelatedNews({ currentArticle }: RelatedNewsProps) {
    const relatedArticles = await getRelatedNews(currentArticle.id, currentArticle.tags)
    return <RelatedNewsClient relatedArticles={relatedArticles} />
}
