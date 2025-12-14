"use client";

import { useLanguage } from "@/components/common/LanguageProvider";
import { LoadingRepresentativeCard } from "./LoadingRepresentativeCard";

export function LoadingRepresentativesGrid() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="space-y-8">
      {/* Main loading spinner prominently displayed */}
      <div className="flex items-center justify-center min-h-[40vh] py-16">
        <div className="flex flex-col items-center">
          {/* Spinning circle */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>

          {/* Loading text */}
          <div className="text-center mt-6">
            <p className="text-[#862633] font-medium text-lg animate-pulse">
              {t("Képviselők betöltése...", "Loading representatives...")}
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingRepresentativeCard key={i} />
        ))}
      </div>
    </div>
  );
}
