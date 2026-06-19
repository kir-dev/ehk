import StudyScholarshipContent from "@/app/(app)/[lang]/tanulmanyi-osztondij/components/StudyScholarshipContent";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function StudyScholarshipPage({
  params }: { params: Promise<{ lang: Locale }> }){
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(validLang, 'scholarships');
  const academic = dictionary.scholarships.academic;

    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-2 md:px-4 py-8">
            <PageHeader title={academic.title} subtitle={academic.intro} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <StudyScholarshipContent
                lang={validLang}
                emptyTitle={academic.empty_title}
                emptyDescription={academic.empty_description}
              />
            </Suspense>
          </div>
        </div>
    );
}
