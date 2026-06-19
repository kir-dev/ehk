"use client"

import FileCard from "@/components/common/FileCard"
import { useTranslate } from "@/hooks/useTranslate"
import { translateTags } from "@/lib/utils"
import { Media, News } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export interface NewsDetailMainProps {
  article: News
}

type NewsFileItem = {
  id?: string
  file: number | Media
  description?: string
}

export function NewsDetailMain({ article }: NewsDetailMainProps) {
  const { t, lang } = useTranslate()
  const router = useRouter()

  const title = lang === 'EN' && article.titleEng ? article.titleEng : article.title
  const content = lang === 'EN' ? article.description.text_en : article.description.text_hu
  const displayTags = translateTags(article.tags as unknown as string[], lang)

  const formatDate = (dateString: string) => {
    const d = new Date(dateString)
    if (lang === 'EN') {
      return d.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })
    }
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}. ${m}. ${day}`
  }

  const files = (article.files as unknown as NewsFileItem[]) ?? []

  return (
    <article className="flex flex-col font-open-sans">
      {/* Back navigation */}
      <div className="flex items-center bg-[#fffefc] border-t border-x border-[#e9e2d6] rounded-t-2xl px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 bg-[#862633] hover:bg-[#9e2d3e] text-white border border-[#e9e2d6] rounded-full px-4 py-2 transition-colors duration-200 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          <span className="font-bold text-sm leading-none">{t('news.back')}</span>
        </button>
      </div>

      {/* Dark red header block */}
      <header className="flex flex-col gap-3 md:gap-4 bg-[#862633] border-x border-[#e9e2d6] px-5 py-6 md:px-8 md:py-8 text-white">
        {displayTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {displayTags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-flex items-center justify-center rounded-2xl border border-[#e9e2d6] bg-white px-2.5 py-1 text-[13px] font-semibold uppercase text-[#862633]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-playfair font-bold text-[26px] md:text-[32px] leading-tight text-white break-words">
          {title}
        </h1>

        <p className="text-sm md:text-base font-semibold text-[#fffefc]">{formatDate(article.date)}</p>
      </header>

      {/* Content + attached files */}
      <div className="flex flex-col gap-6 bg-[#fffefc] border-b border-x border-[#e9e2d6] rounded-b-2xl px-5 py-6 md:px-8 md:py-8">
        <div className="richtext prose prose-sm md:prose-base max-w-none font-open-sans text-sm text-black leading-relaxed">
          <RichText data={content} />
        </div>

        {files.length > 0 && (
          <>
            <hr className="border-t border-[#e9e2d6]" />
            <section className="flex flex-col gap-4">
              <h2 className="text-[13px] font-semibold uppercase tracking-[1.3px] text-[#6e6660]">
                {t('news.attachments')}
              </h2>
              <div className="flex flex-col gap-4">
                {files.map((item) => {
                  const media = typeof item.file === 'object' ? item.file : null
                  const name = media?.filename ?? t('news.file')
                  const hasDesc = !!(item.description && item.description.trim().length > 0)
                  const key = item.id ?? media?.id ?? `${name}`
                  return (
                    <FileCard
                      key={key}
                      file={media ?? undefined}
                      title={hasDesc ? item.description! : name}
                      actionType="view"
                    />
                  )
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </article>
  )
}
