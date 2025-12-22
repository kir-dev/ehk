import StudyScholarshipContent from "@/app/(app)/[lang]/tanulmanyi-osztondij/components/StudyScholarshipContent";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { Suspense } from "react";

export default async function StudyScholarshipPage({
  params }: { params: Promise<{ lang: string }> }){
  const { lang } = await params;
  const t = (hu: string, en?: string) => (lang === 'en' ? (en || hu) : hu);
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageHeader title={t('Tanulmányi ösztöndíj', 'Academic Scholarship')} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <StudyScholarshipContent  locale={lang as 'hu' | 'en'} />
            </Suspense>
          </div>
        </div>
    );
}