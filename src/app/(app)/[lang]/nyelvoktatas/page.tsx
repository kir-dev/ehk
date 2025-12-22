import LanguageEducationContent from "@/app/(app)/[lang]/nyelvoktatas/components/LanguageEducationContent";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { Suspense } from "react";

export default async function LanguageEducationPage({
  params }: { params: Promise<{ lang: string }> }){
  const { lang } = await params;
  const t = (hu: string, en?: string) => (lang === 'en' ? (en || hu) : hu);
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageHeader title={t('Nyelvoktatás', 'Language Education')} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <LanguageEducationContent  locale={lang as 'hu' | 'en'} />
            </Suspense>
          </div>
        </div>
    );
}