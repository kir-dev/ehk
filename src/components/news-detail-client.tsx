"use client"

import { ArrowLeft, Calendar, Tag, Share2, Clock, Download, FileText, File } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { News, Media } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import ShareButton from "@/components/ShareButton"
import { useLanguage } from "@/components/LanguageProvider"
import { translateTags } from "@/lib/utils"

export interface NewsDetailClientProps {
  article: News
}

type NewsFileItem = {
  id?: string
  file: number | Media
  description?: string
}

function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as { root?: unknown }).root
  return collectText(root)
}

function collectText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: unknown; children?: unknown }
  let out = ''
  if (typeof n.text === 'string') out += n.text + ' '
  const children = Array.isArray(n.children) ? n.children : []
  for (const child of children) out += collectText(child)
  return out
}

function getReadingTimeFromRichText(data: unknown): number {
  const text = lexicalToPlainText(data)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatBytes(bytes?: number | null): string | null {
  if (!bytes || bytes <= 0) return null
  const units = ["B", "KB", "MB", "GB", "TB"]
  let i = 0
  let val = bytes
  while (val >= 1024 && i < units.length - 1) {
    val = val / 1024
    i++
  }
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

function getFileIcon(type?: string | null) {
  const t = (type || "").toLowerCase()
  if (t.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />
  if (t.includes("word") || t.includes("document") || t.includes("msword")) return <FileText className="w-4 h-4 text-blue-500" />
  if (t.includes("excel") || t.includes("spreadsheet") || t.includes("sheet")) return <FileText className="w-4 h-4 text-green-500" />
  return <File className="w-4 h-4 text-gray-500" />
}

function useT() {
  const { lang } = useLanguage()
  return (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
}

export function NewsDetailClientMain({ article }: NewsDetailClientProps) {
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
        <div className="prose prose-sm md:prose-lg max-w-none text-gray-700 leading-relaxed">
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
                        <div className="flex-shrink-0">{getFileIcon(mime)}</div>
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

export function NewsDetailClientSidebar({ article }: NewsDetailClientProps) {
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
