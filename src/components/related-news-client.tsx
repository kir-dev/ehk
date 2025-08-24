"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { News } from "@/payload-types"
import { useLanguage } from "@/components/LanguageProvider"

export function RelatedNewsClient({ relatedArticles }: { relatedArticles: News[] }) {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
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
        <CardTitle className="text-lg">{t('Kapcsolódó hírek', 'Related news')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <div key={article.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <Link href={`/hirek/${article.id}`} className="group block">
                <h4 className="font-medium text-sm text-gray-900 group-hover:text-ehk-dark-red transition-colors mb-2 line-clamp-2">
                  {lang === 'EN' && article.titleEng ? article.titleEng : article.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent hover:border-ehk-dark-red hover:text-ehk-dark-red" asChild>
          <Link href="/">
            {t('Összes hír megtekintése', 'View all news')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

