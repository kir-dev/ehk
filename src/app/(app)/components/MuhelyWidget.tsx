"use client"

import React from "react"
import Link from "next/link"
import { useTranslate } from "@/hooks/useTranslate"

type Props = {
  className?: string
}

export default function MuhelyWidget({ className }: Readonly<Props>) {
  const { t } = useTranslate()

  return (
    <div className={`bg-[#6b0f1a] border border-[#e9e2d6] p-4 rounded-lg w-full flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow text-white ${className ?? ""}`}>
      {/* Title block */}
      <div className="flex items-center py-1">
        <h3 className="font-playfair font-bold text-[32px] leading-[1.2] text-[#fbe4d3]">
          {t("widgets.muhely_title", "MŰHELY")}
        </h3>
      </div>

      {/* Description text */}
      <p className="font-open-sans font-semibold text-[13px] text-white/95 leading-normal max-w-52.5">
        {t("widgets.muhely_desc", "Olvasd el a legfrissebb Műhely lapszámot!")}
      </p>

      {/* Action button */}
      <Link
        href="https://muhely.bme.hu/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#fbe4d3] hover:bg-[#f5cfb5] text-[#6b0f1a] font-open-sans font-semibold text-[13px] px-4 py-1.5 rounded-full w-fit transition-all duration-300 mt-2 block shadow-sm hover:shadow-md"
      >
        {t("widgets.muhely_btn", "Olvasom")}
      </Link>
    </div>
  )
}
