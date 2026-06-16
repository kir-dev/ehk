"use client"

import { useTranslate } from "@/hooks/useTranslate";
import { getTagRoute, translateTag, cn } from "@/lib/utils";
import { News } from "@/payload-types";
import Link from "next/link";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news: { id, title, titleEng, shortDescription, date, tags } }: NewsCardProps) {
    const { t, lang } = useTranslate()
    const locale = lang === 'EN' ? 'en-US' : 'hu-HU'

    const displayTitle = lang === 'EN' && titleEng ? titleEng : title
    const shortText = lang === 'EN' ? (shortDescription.text_en || shortDescription.text_hu) : shortDescription.text_hu
    const originalTags = (tags as unknown) as string[]
    const newsUrl = `/${lang.toLowerCase()}/hirek/${id}`

    return (
        <div className="bg-white border border-[#e9e2d6] rounded-2xl p-5 flex flex-col h-full hover:shadow-md transition-shadow duration-300 relative group">
            {/* Top tags section */}
            <div className="flex flex-wrap gap-2 mb-4">
                {originalTags?.map((rawTag, index) => {
                    const href = getTagRoute(rawTag, lang)
                    const label = translateTag(rawTag, lang).toUpperCase()
                    const isFirst = index === 0

                    const chip = (
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider transition-colors duration-200",
                                isFirst
                                    ? "bg-[#862633]/10 text-[#862633] group-hover:bg-[#862633]/20"
                                    : "bg-[#e8e4e0]/60 text-[#3d3d3d] group-hover:bg-[#e8e4e0]/80"
                            )}
                        >
                            {label}
                        </span>
                    )
                    return href ? (
                        <Link key={`${rawTag}-${index}`} href={href} className="focus:outline-none focus:ring-2 focus:ring-[#862633] rounded-full">
                            {chip}
                        </Link>
                    ) : (
                        <span key={`${rawTag}-${index}`}>{chip}</span>
                    )
                })}
            </div>

            {/* Date */}
            <p className="text-[#9a9a9a] text-xs font-open-sans mb-2">
                {new Date(date).toLocaleDateString(locale)}
            </p>

            {/* Title */}
            <h3 className="text-[#1a1a1a] text-lg md:text-xl font-playfair font-bold mb-3 leading-snug group-hover:text-[#862633] transition-colors duration-200">
                <Link href={newsUrl}>
                    {displayTitle}
                </Link>
            </h3>

            {/* Description */}
            <p className="text-[#3d3d3d] text-sm font-open-sans leading-relaxed text-justify mb-6 flex-grow break-words">
                {shortText}
            </p>

            {/* Footer read more */}
            <div className="pt-4 border-t border-[#e8e4e0]/40 mt-auto">
                <Link
                    href={newsUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#862633] hover:text-[#862633]/80 transition-colors group/link"
                >
                    <span>{t('news.read_more', 'Elolvasom')}</span>
                    <svg
                        className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}