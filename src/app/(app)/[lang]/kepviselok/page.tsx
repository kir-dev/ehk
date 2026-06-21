export const dynamic = "force-dynamic";

import RepresentativesGrid from '@/app/(app)/[lang]/kepviselok/components/RepresentativesGrid';
import { LoadingRepresentativesGrid } from '@/components/common/LoadingSpinner';
import { getDictionary } from '@/get-dictionary';
import { Suspense } from 'react';
import { LanguageProvider, Lang } from '@/components/common/LanguageProvider';

export default async function RepresentativesPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'hu' | 'en', 'representatives');
  
    return (
        <LanguageProvider defaultLang={(lang as string).toUpperCase() as Lang} dictionary={dictionary}>
            <main className="min-h-screen bg-[#f9f4f0] px-3 py-6 md:px-8 md:py-8">
                <div className="mx-auto max-w-334">
                    <Suspense fallback={<LoadingRepresentativesGrid />}>
                        <RepresentativesGrid
                            title={dictionary.representatives.title}
                            description={dictionary.representatives.description}
                        />
                    </Suspense>
                </div>
            </main>
        </LanguageProvider>
    )
}
