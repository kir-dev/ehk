"use client";

import { useLanguage } from "@/components/common/LanguageProvider";
import { LoadingCard } from "./LoadingCard";

export function LoadingGrid() {
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
              {t("Emlékeztetők betöltése...", "Loading reminders...")}
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton year sections */}
      {[2024, 2023, 2022].map((year) => (
        <div key={year} className="space-y-4">
          {/* Year header skeleton */}
          <div className="flex items-center space-x-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded-full w-8"></div>
          </div>

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
