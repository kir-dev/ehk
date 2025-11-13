import { Suspense } from "react";
import { AcademicRegulationsHeader } from "@/components/academic-regulations-header";
import RegulationsList from "@/components/regulations-list";
import { LoadingRegulationsGrid } from "@/components/loading-spinner";
import { getAcademicRegulations } from "@/lib/payload-cms";

export default function RegulationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AcademicRegulationsHeader />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <RegulationsList loader={getAcademicRegulations} />
        </Suspense>
      </div>
    </div>
  );
}
