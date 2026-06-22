export const dynamic = "force-dynamic";

import HelpPageContent from "@/app/(app)/[lang]/kisokosok/components/HelpPageContent";
import { LoadingHelpPageGrid } from "@/app/(app)/[lang]/kisokosok/components/skeletons/LoadingHelpPageGrid";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";
import { LanguageProvider, Lang } from "@/components/common/LanguageProvider";

export default async function HelpPage({
  params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "knowledge_base");
  
  return (
    <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
      <div className="min-h-screen bg-[#f9f4f0]">
        <div className="container mx-auto px-2 md:px-4 py-8">
          <PageHeader title={dictionary.knowledge_base.title} />
          <Suspense fallback={<LoadingHelpPageGrid />}>
            <HelpPageContent />
          </Suspense>
        </div>
      </div>
    </LanguageProvider>
  );
}
