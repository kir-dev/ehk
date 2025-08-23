export const dynamic = "force-dynamic";

import { Suspense } from 'react'
import RemindersGrid from '@/components/reminders-grid'
import { RemindersHeader } from '@/components/reminders-header'
import { LoadingGrid } from '@/components/loading-spinner'

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
