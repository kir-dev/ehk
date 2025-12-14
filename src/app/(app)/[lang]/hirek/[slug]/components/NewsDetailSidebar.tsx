"use client"

import { useLanguage } from "@/components/common/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { translateTags } from "@/lib/utils"
import { News } from "@/payload-types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getReadingTimeFromRichText } from "../lib/news-utils"

export interface NewsDetailSidebarProps {
  article: News
}

function useT() {
  const { lang } = useLanguage()
  return (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
}

export function NewsDetailSidebar({ article }: NewsDetailSidebarProps) {
  const t = useT()
  const { lang } = useLanguage()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'EN' ? 'en-US' : 'hu-HU', {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t('Cikk információk', 'Article info')}</h3>
        <div className="space-y-2.5 md:space-y-3">
          <div>
            <span className="text-xs md:text-sm font-medium text-gray-500">{t('Publikálás dátuma', 'Published')}</span>
            <p className="text-sm text-gray-900">{formatDate(article.date)}</p>
          </div>
          <div>
            <span className="text-xs md:text-sm font-medium text-gray-500">{t('Olvasási idő', 'Reading time')}</span>
            <p className="text-sm text-gray-900">{getReadingTimeFromRichText((lang === 'EN' ? article.description.text_en : article.description.text_hu))} {t('perc', 'min')}</p>
          </div>
          {article.files && article.files.length > 0 && (
            <div>
              <span className="text-xs md:text-sm font-medium text-gray-500">{t('Csatolt fájlok', 'Attachments')}</span>
              <p className="text-sm text-gray-900">{article.files.length} {t('fájl', 'file(s)')}</p>
            </div>
          )}
          <div>
            <span className="text-xs md:text-sm font-medium text-gray-500">{t('Címkék', 'Tags')}</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {translateTags(article.tags as unknown as string[], lang).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent hover:border-[#862633] hover:text-[#862633]" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('Vissza a hírekhez', 'Back to news')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
