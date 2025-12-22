import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import RegulationsList from "@/components/regulations/RegulationsList";
import { getAcademicRegulations } from "@/lib/payload-cms";
import { Suspense } from "react";

export default async function RegulationsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = (hu: string, en?: string) => (lang === 'en' ? (en || hu) : hu);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={t('Oktatási szabályzatok', 'Academic Regulations')} />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getAcademicRegulations}  locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  );
}
