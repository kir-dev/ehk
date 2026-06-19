"use client"

import { useTranslate } from "@/hooks/useTranslate"
import { translateTag } from "@/lib/utils"
import { News } from "@/payload-types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function RelatedNewsClient({ relatedArticles }: { relatedArticles: News[] }) {
  const { t, lang } = useTranslate()

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

  if (!relatedArticles || relatedArticles.length === 0) return null

  return (
    <section className="flex flex-col gap-4 bg-[#fffefc] border border-[#e9e2d6] rounded-2xl p-4 font-open-sans">
      <h2 className="text-[13px] font-semibold uppercase tracking-[1.3px] text-[#6e6660]">
        {t('news.related_news')}
      </h2>

      <div className="flex flex-col gap-4">
        {relatedArticles.map((article) => {
          const title = lang === 'EN' && article.titleEng ? article.titleEng : article.title
          const tags = (article.tags as unknown as string[])?.slice(0, 2) ?? []
          return (
            <div
              key={article.id}
              className="group flex flex-col gap-4 border border-[#e9e2d6] rounded-2xl p-4 transition-colors hover:border-[#d3afaf]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#6e6660]">{formatDate(article.date)}</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {tags.map((rawTag, index) => (
                      <span
                        key={`${rawTag}-${index}`}
                        className="inline-flex items-center justify-center rounded-full border border-[#3d3d3d] bg-white px-1.5 py-0.5 text-[8px] leading-none text-[#3d3d3d] uppercase"
                      >
                        {translateTag(rawTag, lang)}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-playfair font-semibold text-sm leading-snug text-black">
                  {title}
                </h3>
              </div>

              <hr className="border-t border-[#e9e2d6]" />

              <Link
                href={`/hirek/${article.id}`}
                className="inline-flex items-center justify-between gap-4 text-xs font-bold text-[#862633]"
              >
                <span>{t('news.read_more')}</span>
                <ArrowRight className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
