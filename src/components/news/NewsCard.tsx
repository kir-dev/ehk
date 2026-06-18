"use client"

import { useTranslate } from "@/hooks/useTranslate";
import { translateTag, cn } from "@/lib/utils";
import { News } from "@/payload-types";
import Link from "next/link";

interface NewsCardProps {
  news: News;
  activeTag?: string;
}

export default function NewsCard({ news: { id, title, titleEng, shortDescription, date, tags }, activeTag }: Readonly<NewsCardProps>) {
    const { t, lang } = useTranslate()
    const locale = lang === 'EN' ? 'en-US' : 'hu-HU'

    const displayTitle = lang === 'EN' && titleEng ? titleEng : title
    const shortText = lang === 'EN' ? (shortDescription.text_en || shortDescription.text_hu) : shortDescription.text_hu
    const originalTags = (tags as unknown) as string[]
    const newsUrl = `/${lang.toLowerCase()}/hirek/${id}`

    return (
        <div className="bg-[#fffefc] border border-[#e9e2d6] rounded-2xl p-4 flex flex-col gap-4 h-full hover:shadow-md transition-shadow duration-300 relative group">
            {/* Top tags section */}
            <div className="flex flex-wrap gap-2">
                {originalTags?.map((rawTag, index) => {
                    const label = translateTag(rawTag, lang).toUpperCase()
                    const activeTagsList = activeTag ? activeTag.split(',').filter(Boolean) : []
                    const isActive = activeTagsList.includes(rawTag)

                    const nextTags = isActive
                        ? activeTagsList.filter(t => t !== rawTag)
                        : [...activeTagsList, rawTag]
                    
                    const nextTagParam = nextTags.join(',')
                    const href = nextTagParam 
                        ? `/${lang.toLowerCase()}?tab=news&tag=${encodeURIComponent(nextTagParam)}`
                        : `/${lang.toLowerCase()}?tab=news`

                    const chip = (
                        <span
                            className={cn(
                                "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-open-sans font-normal whitespace-nowrap transition-colors duration-200 border",
                                isActive
                                    ? "bg-[#ffe6e6] text-[#862633] border-[#862633] hover:bg-[#ffe6e6]/80"
                                    : "bg-transparent text-[#3d3d3d] border-[#3d3d3d] hover:bg-[#3d3d3d]/5"
                            )}
                        >
                            {label}
                        </span>
                    )
                    return (
                        <Link key={`${rawTag}-${index}`} href={href} scroll={false} className="focus:outline-none focus:ring-2 focus:ring-[#862633] rounded-full">
                            {chip}
                        </Link>
                    )
                })}
            </div>

            {/* Date + Title container */}
            <div className="flex flex-col gap-2 items-start w-full">
                {/* Date */}
                <p className="font-open-sans font-semibold text-[11px] text-[#6e6660]">
                    {new Date(date).toLocaleDateString(locale)}
                </p>

                {/* Title */}
                <h3 className="font-playfair font-bold text-[22px] leading-[1.3] text-black w-full group-hover:text-[#862633] transition-colors duration-200">
                    <Link href={newsUrl}>
                        {displayTitle}
                    </Link>
                </h3>
            </div>

            {/* Description */}
            <p className="font-open-sans font-normal leading-[1.6] text-sm text-black w-full grow text-left wrap-break-word">
                {shortText}
            </p>

            {/* Divider line */}
            <div className="w-full border-t border-[#e9e2d6] h-0" />

            {/* Footer read more */}
            <Link
                href={newsUrl}
                className="flex items-center justify-between w-full group/link"
            >
                <span className="font-open-sans font-semibold text-[14px] leading-[1.6] text-[#862633] whitespace-nowrap">
                    {t('news.read_more', 'Elolvasom')}
                </span>
                <div className="flex flex-1 items-center justify-end">
                    <svg
                        className="w-6 h-6 text-[#862633] transform group-hover/link:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </Link>
        </div>
    );
}