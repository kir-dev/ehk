"use client"

import { News } from "@/payload-types";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

interface NewsCardProps {
    news: News;
}

const TAG_TRANSLATIONS: Record<string, string> = {
    'EHK': 'EHK',
    'Oktatás': 'Education',
    'Juttatás': 'Grants',
    'Kollégium': 'Dormitory',
    'Pályázat': 'Application',
    'Sport': 'Sports',
    'Külügy': 'International Affairs',
    'Rendezvények': 'Events',
    'Közélet': 'Community Life',
    'Felhívás': 'Announcement',
    'Beszámoló': 'Report',
    'Tájékoztatás': 'Information',
    'Kiemelt hír': 'Featured',
}

export default function NewsCard({ news: { id, title, titleEng, shortDescription, date, tags } }: NewsCardProps) {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    const locale = lang === 'EN' ? 'en-US' : 'hu-HU'

    const displayTitle = lang === 'EN' && titleEng ? titleEng : title
    const shortText = lang === 'EN' ? (shortDescription.text_en || shortDescription.text_hu) : shortDescription.text_hu
    const displayTags = (tags || []).map(tag => (lang === 'EN' ? (TAG_TRANSLATIONS[tag] || tag) : tag))

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative">
            {/* Overlay div that appears on hover */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-0"
                style={{ backgroundImage: "url('/bmebgred.jpg')" }}
            />

            <div className="p-6 flex-grow relative z-10">
                <p className="text-gray-500 text-sm mb-2 group-hover:text-white transition-colors duration-300">
                    {new Date(date).toLocaleDateString(locale)}
                </p>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">{displayTitle}</h3>

                <div className="min-h-[150px] mb-4">
                    <p className="text-gray-600 w-full block break-words group-hover:text-white transition-colors duration-300">
                        {shortText}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {displayTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm group-hover:bg-white group-hover:text-red-800 transition-colors duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-6 pb-6 relative z-10">
                <Link
                    href={`/news/${id}`}
                    className="inline-block bg-ehk-dark-red hover:bg-white hover:text-red-600 text-white py-2 px-4 rounded transition-colors duration-200 text-center w-full border border-transparent hover:border-red-600"
                >
                    {t('Tovább', 'Read more')}
                </Link>
            </div>
        </div>
    );
}