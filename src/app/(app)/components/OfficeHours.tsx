"use client"

import React from "react"
import { useTranslate } from "@/hooks/useTranslate"

export default function OfficeHours() {
  const { t } = useTranslate()

  return (
    <div className="bg-[#fffefc] border border-[#e9e2d6] p-4 rounded-lg w-full flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      {/* Title block */}
      <div className="flex items-center gap-1.5 py-1">
        <span className="size-1.75 rounded-full bg-[#862633] shrink-0" aria-hidden="true" />
        <h3 className="font-open-sans font-semibold text-[13px] text-[#6e6660] tracking-[1.3px] uppercase">
          {t("widgets.office_hours_title", "AZ IRODA FOGADÓIDEJE")}
        </h3>
      </div>

      {/* Grid list */}
      <div className="flex flex-col w-full mt-1">
        {/* Row 1 */}
        <div className="flex items-center justify-between py-2.5 text-xs border-b border-[#e9e2d6] font-open-sans">
          <span className="text-[#3d3d3d] font-normal">
            {t("widgets.study_period", "Szorgalmi időszakban")}
          </span>
          <span className="text-[#1a1a1a] font-semibold">
            10:00 - 14:00
          </span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between py-2.5 text-xs border-b border-[#e9e2d6] font-open-sans">
          <span className="text-[#3d3d3d] font-normal">
            {t("widgets.exam_period", "Vizsgaidőszakban")}
          </span>
          <span className="text-[#1a1a1a] font-semibold">
            11:00 - 13:00
          </span>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between py-2.5 text-xs font-open-sans">
          <span className="text-[#9a9a9a] font-normal">
            {t("widgets.holidays", "Ünnepnapokon")}
          </span>
          <span className="text-[#9a9a9a] font-normal">
            {t("widgets.closed", "zárva")}
          </span>
        </div>
      </div>
    </div>
  )
}
