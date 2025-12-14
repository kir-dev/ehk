import HelpPageContent from "@/app/(app)/[lang]/kisokosok/components/HelpPageContent";
import { LoadingHelpPageContent } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/app/(app)/[lang]/kisokosok/components/PageHeader";
import { Suspense } from "react";

export default async function HelpPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader titleHu="Kisokosok" titleEn="Cheat Sheets" />
        <Suspense fallback={<LoadingHelpPageContent />}>
          <HelpPageContent locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  );
}
