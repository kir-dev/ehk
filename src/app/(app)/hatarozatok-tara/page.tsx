import { DecisionsArchive } from "@/components/decisions-archive"
import { Suspense } from "react"
import { LoadingDecisionsGrid } from "@/components/loading-spinner"

export default function DecisionsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingDecisionsGrid />}>
                <DecisionsArchive />
            </Suspense>
        </div>
    )
}
