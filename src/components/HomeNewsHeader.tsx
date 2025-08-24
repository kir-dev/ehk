"use client"

import { useLanguage } from "@/components/LanguageProvider"

export default function HomeNewsHeader() {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
  return (
    <h2 className="text-3xl font-bold mb-8 border-b-2 border-red-500 pb-2 inline-block">
      {t('Hírek', 'News')}
    </h2>
  )
}

