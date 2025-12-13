import { Suspense } from "react"
import RegulationsList from "@/components/regulations/RegulationsList"
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner"
import {BenefitsRegulationsHeader} from "@/components/ui/benefits-regulations";
import { getBenefitRegulations } from "@/lib/payload-cms";

export default async function RegulationsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <BenefitsRegulationsHeader />
                <Suspense fallback={<LoadingRegulationsGrid />}>
                    <RegulationsList loader={getBenefitRegulations}  locale={lang as 'hu' | 'en'} />
                </Suspense>
            </div>
        </div>
    )
}
