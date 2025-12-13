export const dynamic = "force-dynamic";

import { Suspense } from 'react'
import RemindersGrid from '@/components/RemindersGrid'
import { RemindersHeader } from '@/components/RemindersHeader'
import { LoadingGrid } from '@/components/LoadingSpinner'

export default function RemindersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <RemindersHeader />
                <Suspense fallback={<LoadingGrid />}>
                    <RemindersGrid />
                </Suspense>
            </div>
        </div>
    )
}
