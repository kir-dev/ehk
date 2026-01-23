import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";
import EHKScholarshipContent from "./components/EHKScholarshipsContent";

export default async function EHKScholarshipPage({
  params }: { params: Promise<{ lang: Locale }> }){
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageHeader title={dictionary.scholarships.ehk.title} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <EHKScholarshipContent content={dictionary.scholarships.ehk} />
            </Suspense>
          </div>
        </div>
    );
}