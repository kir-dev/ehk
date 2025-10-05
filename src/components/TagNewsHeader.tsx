"use client"

import { useLanguage } from "@/components/LanguageProvider"

type Props = {
  titleHu: string
  titleEn: string
  descHu?: string
  descEn?: string
}

export default function TagNewsHeader({ titleHu, titleEn, descHu, descEn }: Props) {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="mt-6 md:mt-8 mb-8 md:mb-10">
      <h2 data-hirek-header="true" className="text-3xl font-bold mb-2 border-b-2 border-[#862633] pb-2 inline-block scroll-mt-24">
        {t(titleHu, titleEn)}
      </h2>
      {(descHu || descEn) && (
        <p className="text-gray-600 mt-1">
          {t(descHu || "", descEn || descHu || "")}
        </p>
      )}
    </div>
  )
}
