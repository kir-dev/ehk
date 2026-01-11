"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslate } from "@/hooks/useTranslate"
import { getTagRoute, translateTag } from "@/lib/utils"
import { News } from "@/payload-types"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export function RelatedNewsClient({ relatedArticles }: { relatedArticles: News[] }) {
  const { t, lang } = useTranslate()
  const locale = lang === 'EN' ? 'en-US' : 'hu-HU'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    })
  }

  if (!relatedArticles || relatedArticles.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('news.related_news')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <div key={article.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <div className="group block">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <Link href={`/hirek/${article.id}`} className="group/title block">
                  <h4 className="font-medium text-sm text-gray-900 group-hover/title:text-ehk-dark-red transition-colors mb-2 line-clamp-2">
                    {lang === 'EN' && article.titleEng ? article.titleEng : article.title}
                  </h4>
                </Link>
                <div className="flex flex-wrap gap-1">
                  {(article.tags as unknown as string[])?.slice(0, 2).map((rawTag, index) => {
                    const href = getTagRoute(rawTag, lang)
                    const label = translateTag(rawTag, lang)
                    const badge = (
                      <Badge variant="outline" className="text-xs">
                        {label}
                      </Badge>
                    )
                    return href ? (
                      <Link key={`${rawTag}-${index}`} href={href} className="focus:outline-none focus:ring-2 focus:ring-ehk-dark-red rounded">
                        {badge}
                      </Link>
                    ) : (
                      <span key={`${rawTag}-${index}`}>{badge}</span>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent hover:border-ehk-dark-red hover:text-ehk-dark-red" asChild>
          <Link href="/">
            {t('news.view_all_news')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
