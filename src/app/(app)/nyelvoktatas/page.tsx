import LanguageEducationContent from "@/app/(app)/nyelvoktatas/components/LanguageEducationContent";
import { LanguageEducationHeader } from "@/app/(app)/nyelvoktatas/components/LanguageEducationHeader";
import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
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