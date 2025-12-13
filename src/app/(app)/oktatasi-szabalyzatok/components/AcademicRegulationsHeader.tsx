"use client"

import { useLanguage } from "@/components/common/LanguageProvider"

export function AcademicRegulationsHeader() {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{t('Oktatási szabályzatok', 'Academic Regulations')}</h1>
    </div>
  )
}

