import { Suspense } from "react"
import RegulationsList from "@/components/RegulationsList"
import { LoadingRegulationsGrid } from "@/components/LoadingSpinner"
import {BenefitsRegulationsHeader} from "@/components/ui/benefits-regulations";
import { getBenefitRegulations } from "@/lib/payload-cms";

export default function RegulationsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <BenefitsRegulationsHeader />
                <Suspense fallback={<LoadingRegulationsGrid />}>
                    <RegulationsList loader={getBenefitRegulations} />
                </Suspense>
            </div>
        </div>
    )
}
