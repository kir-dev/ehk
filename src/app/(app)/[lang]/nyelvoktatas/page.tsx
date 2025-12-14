import LanguageEducationContent from "@/app/(app)/[lang]/nyelvoktatas/components/LanguageEducationContent";
import { LanguageEducationHeader } from "@/app/(app)/[lang]/nyelvoktatas/components/LanguageEducationHeader";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import { Suspense } from "react";

export default async function LanguageEducationPage({
  params }: { params: Promise<{ lang: string }> }){
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <LanguageEducationHeader locale={lang as 'hu' | 'en'} />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <LanguageEducationContent  locale={lang as 'hu' | 'en'} />
            </Suspense>
          </div>
        </div>
    );
}