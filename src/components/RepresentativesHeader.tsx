"use client"

import { useLanguage } from '@/components/LanguageProvider'

export function RepresentativesHeader() {
    const { lang } = useLanguage()
    const title = lang === 'EN' ? 'Representatives' : 'Képviselők'
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{title}</h1>
        </div>
    )
}
