"use client";

import { PageLoader } from "@/components/common/PageLoader";
import { useTranslate } from "@/hooks/useTranslate";
import { LoadingRepresentativeCard } from "./LoadingRepresentativeCard";

export function LoadingRepresentativesGrid() {
  const { t } = useTranslate();

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#fffefc]">
      <div className="flex items-center justify-between border-x border-t border-[#e9e2d6] bg-[#fffefc] px-4 py-4 md:px-8">
        <div className="h-10 w-24 rounded-full bg-[#862633]" />
        <div className="hidden h-8 w-61 rounded-full border border-[#e9e2d6] bg-[#fffefc] sm:block" />
      </div>

      <div className="bg-[#862633] px-4 py-6 md:px-8 md:py-8">
        <div className="h-10 w-64 max-w-full rounded bg-white/20" />
        <div className="mt-3 h-5 w-96 max-w-full rounded bg-white/15" />
      </div>

      <div className="px-4 py-8 md:px-8 md:py-10">
        <PageLoader text={t("representatives.loading")} />

        <div className="mx-auto grid max-w-318 grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 xl:grid-cols-3 xl:gap-x-12.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingRepresentativeCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
