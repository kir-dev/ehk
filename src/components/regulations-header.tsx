"use client"

import { useLanguage } from "@/components/LanguageProvider"

export function RegulationsHeader() {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{t('Szabályzatok', 'Regulations')}</h1>
    </div>
  )
}

