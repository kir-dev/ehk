import LanguageEducationContent from "@/app/(app)/[lang]/nyelvoktatas/components/LanguageEducationContent";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function LanguageEducationPage({
  params }: { params: Promise<{ lang: Locale }> }){
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageHeader title={dictionary.language_education.title} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <LanguageEducationContent content={dictionary.language_education} />
            </Suspense>
          </div>
        </div>
    );
}