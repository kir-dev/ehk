"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslate } from "@/hooks/useTranslate";
import { translateTag } from "@/lib/utils";

interface NewsFilterProps {
  basePath: string;
}

export default function NewsFilter({ basePath }: Readonly<NewsFilterProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useTranslate();

  // Read active tag and filter panel open state from searchParams to support SSR/deep linking
  const activeTag = searchParams.get("tag") || undefined;
  const isFilterOpenParam = searchParams.get("showFilters") === "true";
  const [isOpen, setIsOpen] = useState(isFilterOpenParam);

  useEffect(() => {
    const open = searchParams.get("showFilters") === "true";
    setIsOpen(open);
  }, [searchParams]);

  // standard tags list
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
    "International"
  ];

  const handleToggleOpen = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    
    // Sync with URL to preserve states across page reloads/navigations if desired
    const params = new URLSearchParams(searchParams.toString());
    if (nextOpen) {
      params.set("showFilters", "true");
    } else {
      params.delete("showFilters");
    }
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset to page 1 on filter changes
    
    const activeTagsList = activeTag ? activeTag.split(',').filter(Boolean) : [];
    const isActive = activeTagsList.includes(tag);
    
    const nextTags = isActive
      ? activeTagsList.filter(t => t !== tag)
      : [...activeTagsList, tag];
      
    if (nextTags.length > 0) {
      params.set("tag", nextTags.join(','));
    } else {
      params.delete("tag");
    }
    
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    params.delete("page"); // Reset to page 1
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false });
  };

  const activeTagsList = activeTag ? activeTag.split(',').filter(Boolean) : [];
  const activeCount = activeTagsList.length;

  return (
    <div className="contents">
      {/* Filters Toggle Button */}
      <button
        onClick={handleToggleOpen}
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
          <span className={`${isOpen ? "bg-white text-[#862633]" : "bg-[#862633] text-white"} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold`}>
            {activeCount}
          </span>
        )}
      </button>

      {/* Expanded Tag Panel - spans 100% width thanks to contents parent wrapping */}
      {isOpen && (
        <div className="w-full flex flex-wrap gap-2 p-4 bg-[#fffefc] border border-[#e9e2d6] rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 order-3 mt-2">
          {filterTags.map((tag) => {
            const isActive = activeTagsList.includes(tag);
            const label = translateTag(tag, lang).toUpperCase();
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
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
              onClick={handleClearFilters}
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
