import HelpPageContent from "@/app/(app)/kisokosok/components/HelpPageContent";
import { LoadingHelpPageContent } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/app/(app)/kisokosok/components/PageHeader";
import { Suspense } from "react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader titleHu="Kisokosok" titleEn="Cheat Sheets" />
        <Suspense fallback={<LoadingHelpPageContent />}>
          <HelpPageContent />
        </Suspense>
      </div>
    </div>
  );
}
