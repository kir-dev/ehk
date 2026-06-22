"use client"

import { EmptyState } from "@/components/common/EmptyState"
import RegulationCard from "@/components/regulations/RegulationCard"
import { useTranslate } from "@/hooks/useTranslate"
import type { Regulation } from "@/payload-types"
import { isMedia } from "@/utils/isMedia"

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
            const disp = lang === "EN" ? r.displayText_en || r.displayText_hu : r.displayText_hu || r.displayText_en

            return (
              <RegulationCard
                key={r.id}
                title={title}
                description={description}
                file={media}
                fileDisplayText={disp}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
