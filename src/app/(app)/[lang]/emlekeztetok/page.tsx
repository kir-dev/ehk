export const dynamic = "force-dynamic";

import RemindersGrid from '@/app/(app)/[lang]/emlekeztetok/components/RemindersGrid';
import { LoadingGrid } from '@/components/common/LoadingSpinner';
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from '@/get-dictionary';
import { Suspense } from 'react';
import { LanguageProvider } from '@/components/common/LanguageProvider';

export default async function RemindersPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'hu' | 'en', 'regulations');
    return (
        <LanguageProvider defaultLang={(lang as string).toUpperCase() as 'HU' | 'EN'} dictionary={dictionary}>
            <main className="min-h-screen bg-[#f9f4f0] px-3 py-6 md:px-8 md:py-8">
                <div className="mx-auto max-w-[1336px]">
                    <PageHeader title={dictionary.reminders.title} />
                    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-6 md:p-8">
                        <Suspense fallback={<LoadingGrid />}>
                            <RemindersGrid />
                        </Suspense>
                    </div>
                </div>
            </main>
        </LanguageProvider>
    )
}
