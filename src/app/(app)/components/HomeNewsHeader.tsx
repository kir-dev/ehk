"use client"

import { useTranslate } from "@/hooks/useTranslate"

export default function HomeNewsHeader() {
  const { t } = useTranslate()
  return (
    <h2
      data-hirek-header="true"
      className="text-3xl font-bold mb-8 border-b-2 border-red-500 pb-2 inline-block scroll-mt-24"
    >
      {t('news.title')}
    </h2>
  )
}
