import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import StudyScholarshipContent from "@/app/(app)/[lang]/tanulmanyi-osztondij/components/StudyScholarshipContent";
import { StudyScholarshipHeader } from "@/app/(app)/[lang]/tanulmanyi-osztondij/components/StudyScholarshipHeader";
import { Suspense } from "react";

export default async function StudyScholarshipPage({
  params }: { params: Promise<{ lang: string }> }){
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <StudyScholarshipHeader locale={lang as 'hu' | 'en'} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <StudyScholarshipContent  locale={lang as 'hu' | 'en'} />
            </Suspense>
          </div>
        </div>
    );
}