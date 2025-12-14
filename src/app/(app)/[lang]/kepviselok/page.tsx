export const dynamic = "force-dynamic";

import { Suspense } from 'react'
import RepresentativesGrid from '@/app/(app)/[lang]/kepviselok/components/RepresentativesGrid'
import { RepresentativesHeader } from '@/app/(app)/[lang]/kepviselok/components/RepresentativesHeader'
import { LoadingRepresentativesGrid } from '@/components/common/LoadingSpinner'

export default async function RepresentativesPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <RepresentativesHeader locale={lang as 'hu' | 'en'} />
                <Suspense fallback={<LoadingRepresentativesGrid />}>
                    <RepresentativesGrid  locale={lang as 'hu' | 'en'} />
                </Suspense>
            </div>
        </div>
    )
}
