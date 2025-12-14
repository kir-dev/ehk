"use client";

import { useLanguage } from "@/components/common/LanguageProvider";

export function LoadingDecisionsGrid() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center min-h-[40vh] py-16">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
          <div className="text-center mt-6">
            <p className="text-[#862633] font-medium text-lg animate-pulse">
              {t("Határozatok betöltése...", "Loading decisions...")}
            </p>
          </div>
        </div>
      </div>

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
