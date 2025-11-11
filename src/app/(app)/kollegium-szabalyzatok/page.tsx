import { DormitoryRegulationsHeader } from "@/components/dormitory-regulations-header"
import { LoadingRegulationsGrid } from "@/components/loading-spinner"
import RegulationsList from "@/components/regulations-list"
import { getDormitoryRegulations } from "@/lib/payload-cms"
import { Suspense } from "react"

export default function RegulationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DormitoryRegulationsHeader />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getDormitoryRegulations} />
        </Suspense>
      </div>
    </div>
  )
}
