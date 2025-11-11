import LanguageEducationContent from "@/components/language-education-content";
import { LanguageEducationHeader } from "@/components/language-education-header";
import { LoadingRegulationsGrid } from "@/components/loading-spinner";
import { Suspense } from "react";

export default function LanguageEducationPage(){
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <LanguageEducationHeader />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <LanguageEducationContent />
            </Suspense>
          </div>
        </div>
    );
}