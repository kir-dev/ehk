import { DecisionsArchive } from "@/components/DecisionsArchive"
import { Suspense } from "react"
import { LoadingDecisionsGrid } from "@/components/LoadingSpinner"

export default function DecisionsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingDecisionsGrid />}>
                <DecisionsArchive />
            </Suspense>
        </div>
    )
}
