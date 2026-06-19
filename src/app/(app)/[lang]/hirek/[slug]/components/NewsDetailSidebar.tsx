"use client"

import { useTranslate } from "@/hooks/useTranslate"
import { News, Representative } from "@/payload-types"
import { Mail } from "lucide-react"

export interface NewsDetailSidebarProps {
  article: News
}

export function NewsDetailSidebar({ article }: NewsDetailSidebarProps) {
  const { t, lang } = useTranslate()

  const representative =
    article.representative && typeof article.representative === 'object'
      ? (article.representative as Representative)
      : null
  const contactEmail = article.contactEmail?.trim() || null

  // Nothing to show -> render nothing
  if (!representative && !contactEmail) return null

  const position = representative?.position?.[0]
  const positionText = position
    ? lang === 'EN'
      ? position.position_en || position.position_hu
      : position.position_hu
    : null
  const repEmail = representative?.emails?.[0]?.email ?? null

  return (
    <section className="flex flex-col gap-2 bg-[#fffefc] border border-[#e9e2d6] rounded-2xl p-4 font-open-sans">
      <h2 className="text-[13px] font-semibold uppercase tracking-[1.3px] text-[#6e6660]">
        {t('news.contacts')}
      </h2>

      <div className="flex flex-col">
        {representative && (
          <div className="flex flex-col gap-1 py-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-[#3d3d3d]">{representative.name}</span>
              {positionText && (
                <>
                  <span className="size-[5px] rounded-full bg-[#6e6660]" />
                  <span className="text-sm text-[#3d3d3d]">{positionText}</span>
                </>
              )}
            </div>
            {repEmail && (
              <a
                href={`mailto:${repEmail}`}
                className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#3d3d3d] hover:text-[#862633] transition-colors w-fit"
              >
                <span>{repEmail}</span>
                <Mail className="size-3 shrink-0" />
              </a>
            )}
          </div>
        )}

        {representative && contactEmail && <hr className="border-t border-[#e9e2d6]" />}

        {contactEmail && (
          <div className="flex flex-col py-2.5">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#3d3d3d] hover:text-[#862633] transition-colors w-fit"
            >
              <span>{contactEmail}</span>
              <Mail className="size-3 shrink-0" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
