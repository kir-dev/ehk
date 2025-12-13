import { Suspense } from "react";
import { AcademicRegulationsHeader } from "@/app/(app)/[lang]/oktatasi-szabalyzatok/components/AcademicRegulationsHeader";
import RegulationsList from "@/components/regulations/RegulationsList";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { getAcademicRegulations } from "@/lib/payload-cms";

export default async function RegulationsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AcademicRegulationsHeader locale={lang as 'hu' | 'en'} />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getAcademicRegulations}  locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  );
}
