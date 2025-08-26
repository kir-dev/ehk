import { Suspense } from "react"
import { RegulationsHeader } from "@/components/regulations-header"
import RegulationsList from "@/components/regulations-list"
import { LoadingRegulationsGrid } from "@/components/loading-spinner"

export default function RegulationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <RegulationsHeader />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList />
        </Suspense>
      </div>
    </div>
  )
}

