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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-2 md:px-4 py-8">
                    <PageHeader title={dictionary.reminders.title} />
                    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-6 md:p-8">
                        <Suspense fallback={<LoadingGrid />}>
                            <RemindersGrid />
                        </Suspense>
                    </div>
                </div>
            </div>
        </LanguageProvider>
    )
}
