"use client";

import { PageLoader } from "@/components/common/PageLoader";
import { useTranslate } from "@/hooks/useTranslate";
import { LoadingRepresentativeCard } from "./LoadingRepresentativeCard";

export function LoadingRepresentativesGrid() {
  const { t } = useTranslate();

  return (
    <div className="space-y-8">
      {/* Main loading spinner prominently displayed */}
      <PageLoader text={t("representatives.loading")} />

      {/* Skeleton cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingRepresentativeCard key={i} />
        ))}
      </div>
    </div>
  );
}
