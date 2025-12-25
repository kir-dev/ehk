
import HelpPageContent from "@/app/(app)/[lang]/kisokosok/components/HelpPageContent";
import { LoadingHelpPageContent } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function HelpPage({
  params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={dictionary.knowledge_base.title} />
        <Suspense fallback={<LoadingHelpPageContent />}>
          <HelpPageContent />
        </Suspense>
      </div>
    </div>
  );
}
