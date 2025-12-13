import {getRelatedNews} from "@/lib/payload-cms";
import {News} from "@/payload-types";
import { RelatedNewsClient } from "@/components/RelatedNewsClient";

interface RelatedNewsProps {
    currentArticle: News
}

export async function RelatedNews({ currentArticle }: RelatedNewsProps) {
    const relatedArticles = await getRelatedNews(currentArticle.id, currentArticle.tags)
    return <RelatedNewsClient relatedArticles={relatedArticles} />
}
