"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { translateTag } from "@/lib/utils";

interface NewsFilterProps {
  activeTags: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onTagClick: (tag: string) => void;
  onClearFilters: () => void;
}

const filterTags = [
  "EHK",
  "Oktatás",
  "Juttatás",
  "Kollégium",
  "Pályázat",
  "Sport",
  "Külügy",
  "Rendezvények",
  "Közélet",
  "Felhívás",
  "Beszámoló",
  "Tájékoztatás",
  "Kiemelt hír",
  "International",
];

export default function NewsFilter({
  activeTags,
  isOpen,
  onToggleOpen,
  onTagClick,
  onClearFilters,
}: Readonly<NewsFilterProps>) {
  const { t, lang } = useTranslate();
  const activeCount = activeTags.length;

  return (
    <div className="contents">
      {/* Filters Toggle Button */}
      <button
        type="button"
        onClick={onToggleOpen}
        className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm select-none cursor-pointer ${
          isOpen
            ? "border-transparent bg-[#862633] text-white hover:bg-[#862633]/90"
            : "border-[#e8e4e0] bg-[#fffefc] text-[#3d3d3d] hover:bg-gray-50"
        }`}
      >
        <svg
          className={`w-4 h-4 ${isOpen ? "text-white" : "text-[#3d3d3d]"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>{t("widgets.filters", "Szűrők")}</span>
        {activeCount > 0 && (
          <span
            className={`${
              isOpen ? "bg-white text-[#862633]" : "bg-[#862633] text-white"
            } rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Expanded Tag Panel - spans 100% width thanks to contents parent wrapping */}
      {isOpen && (
        <div className="w-full flex flex-wrap gap-2 p-4 bg-[#fffefc] border border-[#e9e2d6] rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 order-3 mt-2">
          {filterTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            const label = translateTag(tag, lang).toUpperCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-open-sans font-normal transition-colors duration-200 select-none cursor-pointer border ${
                  isActive
                    ? "bg-[#ffe6e6] text-[#862633] border-[#862633] hover:bg-[#ffe6e6]/80"
                    : "bg-transparent text-[#3d3d3d] border-[#3d3d3d] hover:bg-[#3d3d3d]/5"
                }`}
              >
                {label}
              </button>
            );
          })}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-open-sans font-semibold text-[#862633] hover:bg-[#ffe6e6] transition-colors duration-200 select-none cursor-pointer border border-[#862633]/20 ml-auto"
            >
              {t("widgets.clear_filters", "SZŰRŐK TÖRLÉSE")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
