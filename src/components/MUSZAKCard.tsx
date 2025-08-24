"use client"

import React from 'react';
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

interface CardProps {
    title: string;
    titleEng?: string;
    date: string;
    imageUrl: string;
}

const MUSZAKCard: React.FC<CardProps> = ({ title, titleEng, date, imageUrl }) => {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    const displayTitle = lang === 'EN' && titleEng ? titleEng : title
    const locale = lang === 'EN' ? 'en-US' : 'hu-HU'

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 bg-red-700 overflow-hidden">
                {imageUrl ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={displayTitle}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain transition-all duration-300 hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-white text-2xl font-bold">
                        {t('Nincs elérhető kép', 'No Image Available')}
                    </div>
                )}
            </div>
            <div className="px-6 py-4">
                <p className="italic text-gray-600 mb-2 text-sm">{new Date(date).toLocaleDateString(locale)}</p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {displayTitle}
                </h2>
                <div className="mt-2 border-b-4 border-red-700 w-24" />
            </div>
        </div>
    );
};

export default MUSZAKCard;