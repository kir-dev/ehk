"use client";

import { useLanguage } from "@/components/common/LanguageProvider";
import { PageLoader } from "@/components/common/PageLoader";

export function LoadingDecisionsGrid() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="space-y-8">
      <PageLoader text={t("Határozatok betöltése...", "Loading decisions...")} />

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                  <div className="h-3 bg-gray-200 rounded w-40"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
