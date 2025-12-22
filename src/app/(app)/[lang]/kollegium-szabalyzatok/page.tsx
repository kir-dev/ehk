import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner"
import { PageHeader } from "@/components/common/PageHeader"
import RegulationsList from "@/components/regulations/RegulationsList"
import { getDormitoryRegulations } from "@/lib/payload-cms"
import { Suspense } from "react"

import { getDictionary } from "@/get-dictionary"
import { i18n } from "@/i18n-config"

export default async function RegulationsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang as 'hu' | 'en') ? lang as "hu" | "en" : i18n.defaultLocale;
  const dictionary = await getDictionary(validLang);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={dictionary.regulations.title_dormitory} />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getDormitoryRegulations}  locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  )
}
