import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getDictionary } from "@/get-dictionary"
import { Locale } from "@/i18n-config"

type Props = {
  lang: Locale
  activeTab: "news" | "events"
  newsCount: number
  eventsCount: number
}

export default async function Switcher({ lang, activeTab, newsCount, eventsCount }: Readonly<Props>) {
  const dictionary = await getDictionary(lang, "news")


  // Base path prefix
  const prefix = `/${lang.toLowerCase()}`

  return (
    <div className="bg-[#fffefc] border border-[#e8e4e0] flex gap-1 items-center p-1 rounded-full w-fit shadow-sm" data-name="Switcher">
      {/* News Tab */}
      <Link
        href={`${prefix}?tab=news`}
        className={cn(
          "flex gap-2.5 items-center justify-center px-4 py-2 rounded-full transition-all duration-300 font-open-sans",
          activeTab === "news"
            ? "bg-[#862633] text-white font-bold"
            : "text-[#3d3d3d] hover:bg-gray-100/80 font-normal"
        )}
      >
        <span className="text-sm">
          {dictionary.news.title}
        </span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[11px] font-semibold min-w-6 text-center transition-all duration-300",
            activeTab === "news"
              ? "bg-white/20 text-white"
              : "bg-[#e8e4e0]/60 text-[#3d3d3d]"
          )}
        >
          {newsCount}
        </span>
      </Link>

      {/* Events Tab */}
      <Link
        href={`${prefix}?tab=events`}
        className={cn(
          "flex gap-2.5 items-center justify-center px-4 py-2 rounded-full transition-all duration-300 font-open-sans",
          activeTab === "events"
            ? "bg-[#862633] text-white font-bold"
            : "text-[#3d3d3d] hover:bg-gray-100/80 font-normal"
        )}
      >
        <span className="text-sm">
          {dictionary.rendezvenyek.title}
        </span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[11px] font-semibold min-w-6 text-center transition-all duration-300",
            activeTab === "events"
              ? "bg-white/20 text-white"
              : "bg-[#e8e4e0]/60 text-[#3d3d3d]"
          )}
        >
          {eventsCount}
        </span>
      </Link>
    </div>
  )
}
