export const dynamic = "force-dynamic";

import RepresentativesGrid from '@/app/(app)/[lang]/kepviselok/components/RepresentativesGrid';
import { LoadingRepresentativesGrid } from '@/components/common/LoadingSpinner';
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from '@/get-dictionary';
import { Suspense } from 'react';

export default async function RepresentativesPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'hu' | 'en');
  
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <PageHeader title={dictionary.representatives.title} description={dictionary.representatives.description}/>
                <Suspense fallback={<LoadingRepresentativesGrid />}>
                    <RepresentativesGrid />
                </Suspense>
            </div>
        </div>
    )
}
