import { DormitoryRegulationsHeader } from "@/app/(app)/[lang]/kollegium-szabalyzatok/components/DormitoryRegulationsHeader"
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner"
import RegulationsList from "@/components/regulations/RegulationsList"
import { getDormitoryRegulations } from "@/lib/payload-cms"
import { Suspense } from "react"

export default async function RegulationsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DormitoryRegulationsHeader locale={lang as 'hu' | 'en'} />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getDormitoryRegulations}  locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  )
}
