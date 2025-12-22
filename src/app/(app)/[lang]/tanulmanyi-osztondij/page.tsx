import StudyScholarshipContent from "@/app/(app)/[lang]/tanulmanyi-osztondij/components/StudyScholarshipContent";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function StudyScholarshipPage({
  params }: { params: Promise<{ lang: Locale }> }){
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageHeader title={dictionary.scholarships.academic.title} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <StudyScholarshipContent content={dictionary.scholarships.academic} locale={lang} />
            </Suspense>
          </div>
        </div>
    );
}