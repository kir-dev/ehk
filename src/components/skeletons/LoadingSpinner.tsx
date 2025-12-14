"use client";

import { useLanguage } from "@/components/common/LanguageProvider";

export function LoadingSpinner() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        {/* Spinning circle */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>

        {/* Pulsing dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-0"></div>
          <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Loading text with fade animation */}
        <div className="text-center mt-4">
          <p className="text-[#862633] font-medium animate-pulse">
            {t("Betöltés...", "Loading...")}
          </p>
        </div>
      </div>
    </div>
  );
}
