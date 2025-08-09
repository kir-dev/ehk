import { Suspense } from 'react'
import RepresentativesGrid from '@/components/representatives-grid'
import { RepresentativesHeader } from '@/components/representatives-header'

export default function RepresentativesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <RepresentativesHeader />
                <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
                    <RepresentativesGrid />
                </Suspense>
            </div>
        </div>
    )
}
