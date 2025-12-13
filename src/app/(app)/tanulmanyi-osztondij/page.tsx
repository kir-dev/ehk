import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner";
import StudyScholarshipContent from "@/app/(app)/tanulmanyi-osztondij/components/StudyScholarshipContent";
import { StudyScholarshipHeader } from "@/app/(app)/tanulmanyi-osztondij/components/StudyScholarshipHeader";
import { Suspense } from "react";

export default function StudyScholarshipPage(){
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <StudyScholarshipHeader />
            <Suspense fallback={<LoadingRegulationsGrid />}>
              <StudyScholarshipContent />
            </Suspense>
          </div>
        </div>
    );
}