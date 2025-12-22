"use client"

import { useTranslate } from "@/hooks/useTranslate";
import { getTagRoute, translateTag } from "@/lib/utils";
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

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative">
            {/* Overlay div that appears on hover */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-0"
                style={{ backgroundImage: "url('/bmebgred.jpg')" }}
            />

            <div className="p-4 md:p-6 flex-grow relative z-10">
                <p className="text-gray-500 text-xs md:text-sm mb-1.5 md:mb-2 group-hover:text-white transition-colors duration-300">
                    {new Date(date).toLocaleDateString(locale)}
                </p>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">{displayTitle}</h3>

                <div className="min-h-0 md:min-h-[150px] max-h-24 md:max-h-none overflow-hidden mb-3 md:mb-4">
                    <p className="text-gray-600 text-sm md:text-base w-full block break-words group-hover:text-white transition-colors duration-300">
                        {shortText}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                    {originalTags?.map((rawTag, index) => {
                        const href = getTagRoute(rawTag, lang)
                        const label = translateTag(rawTag, lang)
                        const chip = (
                            <span
                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm group-hover:bg-white group-hover:text-red-800 transition-colors duration-300"
                            >
                                {label}
                            </span>
                        )
                        return href ? (
                            <Link key={`${rawTag}-${index}`} href={href} className="focus:outline-none focus:ring-2 focus:ring-ehk-dark-red rounded-full">
                                {chip}
                            </Link>
                        ) : (
                            <span key={`${rawTag}-${index}`}>{chip}</span>
                        )
                    })}
                </div>
            </div>

            <div className="px-4 md:px-6 pb-4 md:pb-6 relative z-10">
                <Link
                    href={`/hirek/${id}`}
                    className="inline-block bg-ehk-dark-red hover:bg-white hover:text-ehk-dark-red text-white py-2 px-4 rounded transition-colors duration-200 text-center w-full border border-transparent hover:border-ehk-dark-red"
                >
                    {t('news.read_more')}
                </Link>
            </div>
        </div>
    );
}