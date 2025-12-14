export const dynamic = "force-dynamic";

import { Suspense } from 'react'
import RemindersGrid from '@/app/(app)/[lang]/emlekeztetok/components/RemindersGrid'
import { RemindersHeader } from '@/app/(app)/[lang]/emlekeztetok/components/RemindersHeader'
import { LoadingGrid } from '@/components/common/LoadingSpinner'

export default async function RemindersPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <RemindersHeader locale={lang as 'hu' | 'en'} />
                <Suspense fallback={<LoadingGrid />}>
                    <RemindersGrid  locale={lang as 'hu' | 'en'} />
                </Suspense>
            </div>
        </div>
    )
}
