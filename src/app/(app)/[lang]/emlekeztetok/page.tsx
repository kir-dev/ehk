export const dynamic = "force-dynamic";

import RemindersGrid from '@/app/(app)/[lang]/emlekeztetok/components/RemindersGrid';
import { LoadingGrid } from '@/components/common/LoadingSpinner';
import { PageHeader } from "@/components/common/PageHeader";
import { Suspense } from 'react';

export default async function RemindersPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = (hu: string, en?: string) => (lang === 'en' ? (en || hu) : hu);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <PageHeader title={t('Emlékeztetők', 'Reminders')} />
                <Suspense fallback={<LoadingGrid />}>
                    <RemindersGrid  locale={lang as 'hu' | 'en'} />
                </Suspense>
            </div>
        </div>
    )
}
