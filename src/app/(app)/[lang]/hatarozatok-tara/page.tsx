export const dynamic = "force-dynamic";

import { DecisionsArchive } from "@/app/(app)/[lang]/hatarozatok-tara/components/DecisionsArchive";
import { LoadingDecisionsGrid } from "@/components/common/LoadingSpinner";
import { Suspense } from "react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { LanguageProvider, Lang } from "@/components/common/LanguageProvider";

export default async function DecisionsPage({
  params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "regulations");

  return (
    <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingDecisionsGrid />}>
          <DecisionsArchive />
        </Suspense>
      </div>
    </LanguageProvider>
  )
}
