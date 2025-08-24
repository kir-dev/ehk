import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {getRelatedNews} from "@/lib/payload-cms";
import {News} from "@/payload-types";
import { RelatedNewsClient } from "@/components/related-news-client";

interface RelatedNewsProps {
    currentArticle: News
}

export async function RelatedNews({ currentArticle }: RelatedNewsProps) {
    const relatedArticles = await getRelatedNews(currentArticle.id, currentArticle.tags)
    return <RelatedNewsClient relatedArticles={relatedArticles} />
}
