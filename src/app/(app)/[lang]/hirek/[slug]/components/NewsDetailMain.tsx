"use client"

import ShareButton from "@/app/(app)/[lang]/hirek/[slug]/components/ShareButton"
import { useLanguage } from "@/components/common/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { translateTags } from "@/lib/utils"
import { Media, News } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { Calendar, Clock, Download, Share2, Tag } from "lucide-react"
import { formatBytes, getReadingTimeFromRichText } from "../lib/news-utils"
import { FileIcon } from "./FileIcon"

export interface NewsDetailMainProps {
  article: News
}

type NewsFileItem = {
  id?: string
  file: number | Media
  description?: string
}

function useT() {
  const { lang } = useLanguage()
  return (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
}

export function NewsDetailMain({ article }: NewsDetailMainProps) {
  const t = useT()
  const { lang } = useLanguage()

  const title = lang === 'EN' && article.titleEng ? article.titleEng : article.title
  const shortText = lang === 'EN' ? (article.shortDescription.text_en || article.shortDescription.text_hu) : article.shortDescription.text_hu
  const content = lang === 'EN' ? article.description.text_en : article.description.text_hu
  const displayTags = translateTags(article.tags as unknown as string[], lang)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'EN' ? 'en-US' : 'hu-HU', {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#862633]" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#862633]" />
              <span>{getReadingTimeFromRichText(content)} {t('perc olvasás', 'min read')}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">{title}</h1>

          <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-4 md:mb-6">{shortText}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {displayTags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1 border-[#862633] text-[#862633] text-xs md:text-sm hover:bg-red-50"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share */}
          <div className="flex justify-start md:justify-end">
            <ShareButton
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent hover:border-[#862633] hover:text-[#862633]"
              title={title}
              text={shortText}
            >
              <Share2 className="w-4 h-4" />
              {t('Megosztás', 'Share')}
            </ShareButton>
          </div>
        </div>

        <Separator className="mb-6 md:mb-8" />

        {/* Content */}
        <div className="prose prose-sm md:prose-lg max-w-none text-gray-700 leading-relaxed richtext">
          <RichText data={content} />
        </div>

        {/* Files */}
        {article.files && article.files.length > 0 && (
          <>
            <Separator className="my-6 md:my-8" />
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                {t('Csatolt fájlok', 'Attachments')}
              </h3>
              <div className="grid gap-3">
                {((article.files as unknown) as NewsFileItem[]).map((item) => {
                  const media = typeof item.file === 'object' ? item.file : null
                  const name: string = media?.filename ?? (lang === 'EN' ? 'File' : 'Fájl')
                  const mime = media?.mimeType ?? undefined
                  const size = formatBytes(media?.filesize)
                  const url = media?.url ?? undefined
                  const key = item.id ?? media?.id ?? `${name}-${url}`
                  const hasDesc = !!(item.description && item.description.trim().length > 0)
                  const titleVal = hasDesc ? item.description! : name
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 p-3 md:p-4 rounded-lg transition-colors border border-gray-200 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0"><FileIcon type={mime} /></div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{titleVal}</h4>
                          <p className="text-xs md:text-sm text-gray-500 truncate">
                            {size ? size : null}
                            {hasDesc ? (size ? ' · ' : '') + name : null}
                          </p>
                        </div>
                      </div>
                      {url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0 hover:bg-white hover:border-[#862633] hover:text-[#862633] bg-transparent"
                          asChild
                        >
                          <a href={url} download>
                            <Download className="w-4 h-4 mr-2" />
                            {t('Letöltés', 'Download')}
                          </a>
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
