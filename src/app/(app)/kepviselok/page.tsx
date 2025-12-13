export const dynamic = "force-dynamic";

import { Suspense } from 'react'
import RepresentativesGrid from '@/components/RepresentativesGrid'
import { RepresentativesHeader } from '@/components/RepresentativesHeader'
import { LoadingRepresentativesGrid } from '@/components/LoadingSpinner'

export default function RepresentativesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <RepresentativesHeader />
                <Suspense fallback={<LoadingRepresentativesGrid />}>
                    <RepresentativesGrid />
                </Suspense>
            </div>
        </div>
    )
}
