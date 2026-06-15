"use client"

import React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { useTranslate } from "@/hooks/useTranslate"

type Props = {
  className?: string
}

export default function ImportantLinks({ className }: Readonly<Props>) {
  const { t } = useTranslate()

  const items = [
    { label: "Neptun", href: "https://neptun.bme.hu" },
    { label: "MŰEPER", href: "https://mueper.bme.hu" },
    { label: "KEFIR", href: "https://kefir.bme.hu" },
  ] as const

  return (
    <div className={`bg-[#fffefc] border border-[#e9e2d6] p-4 rounded-lg w-full flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow ${className ?? ""}`}>
      {/* Title block */}
      <div className="flex items-center py-1">
        <h3 className="font-open-sans font-semibold text-[13px] text-[#6e6660] tracking-[1.3px] uppercase">
          {t("widgets.important_links_title", "FONTOS LINKEK")}
        </h3>
      </div>

      {/* Grid list */}
      <div className="flex flex-col w-full mt-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2.5 text-[13px] font-semibold border-b border-[#e9e2d6] last:border-b-0 group font-open-sans transition-colors"
          >
            <span className="text-[#3d3d3d] group-hover:text-[#862633] transition-colors">
              {item.label}
            </span>
            <ExternalLink className="w-4 h-4 text-[#9a9a9a] group-hover:text-[#862633] transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}