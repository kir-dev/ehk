"use client";

import { useLanguage } from "@/components/common/LanguageProvider";

export function LoadingHelpPageContent() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center min-h-[40vh] py-16">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
          <div className="text-center mt-6">
            <p className="text-[#862633] font-medium text-lg animate-pulse">
              {t("Segítség betöltése...", "Loading help...")}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="mt-4 space-y-2">
              {Array.from({ length: 2 }).map((__, j) => (
                <div key={j} className="h-3 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
