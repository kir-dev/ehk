"use client"

import { EmptyState } from "@/components/common/EmptyState"
import FileCard from "@/components/common/FileCard"
import { useTranslate } from "@/hooks/useTranslate"
import type { Regulation } from "@/payload-types"
import { isMedia } from "@/utils/isMedia"
import { RichText } from "@payloadcms/richtext-lexical/react"

interface Props {
  regulations: Regulation[]
}

export default function RegulationsListClient({ regulations }: Props) {
  const { t, lang } = useTranslate()

  return (
    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
      {regulations.length === 0 ? (
        <EmptyState
          title={t("regulations.no_results")}
          description={t("regulations.no_regulations")}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {regulations.map((r) => {
            const title = lang === "EN" ? r.name_en || r.name_hu : r.name_hu || r.name_en
            const description = lang === "EN" ? r.text_en || r.text_hu : r.text_hu || r.text_en
            const media = r.file && isMedia(r.file) ? r.file : undefined
            const ext = media?.filename?.split(".").pop()?.toLowerCase()
            const disp = lang === "EN" ? r.displayText_en || r.displayText_hu : r.displayText_hu || r.displayText_en

            return (
              <article
                key={r.id}
                className="flex flex-col gap-3 md:gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-4 md:p-6"
              >
                <h2 className="font-playfair font-semibold text-base md:text-lg leading-[1.4] text-[#1a1a1a] break-words">
                  {title}
                </h2>

                <div className="richtext font-open-sans text-sm leading-[1.6] text-[#3d3d3d] max-w-none">
                  <RichText data={description} />
                </div>

                {media && (
                  <FileCard
                    file={media}
                    title={disp || ext || "file"}
                    actionType="view"
                    className="mt-1"
                  />
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
