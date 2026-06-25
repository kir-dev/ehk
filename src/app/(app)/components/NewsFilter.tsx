"use client";

import { useState, useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Read active tag from searchParams
  const activeTag = searchParams.get("tag") || undefined;
  const [isOpen, setIsOpen] = useState(false);

  // Click outside handler to close the popover
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // All tags to filter by
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
    "TDK ösztöndíj",
    "Sportpálya pályázat",
    "Sportpálya igénylés"
  ];

  // Distribute tags equally between 2 columns
  const midIndex = Math.ceil(filterTags.length / 2);
  const leftColumnTags = filterTags.slice(0, midIndex);
  const rightColumnTags = filterTags.slice(midIndex);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
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



  const activeTagsList = activeTag ? activeTag.split(',').filter(Boolean) : [];
  const activeCount = activeTagsList.filter(t => filterTags.includes(t)).length;

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
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



      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-max min-w-[338px] max-w-[calc(100vw-2rem)] md:max-w-[440px] bg-[#fffefc] border border-[#e9e2d6] shadow-[8px_8px_4px_rgba(0,0,0,0.25)] rounded-lg p-4 flex gap-6 md:gap-8 items-start animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Left Column */}
          <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
            {leftColumnTags.map((tag) => {
              const isActive = activeTagsList.includes(tag);
              const label = translateTag(tag, lang).toUpperCase();
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex items-center justify-start px-2.5 py-[3px] rounded-full text-[11px] font-open-sans transition-colors duration-200 select-none cursor-pointer border text-left break-words ${
                    isActive
                      ? "bg-[#ffe6e6] text-[#862633] border-[#862633] font-semibold"
                      : "bg-white text-[#3d3d3d] border-[#6e6660] font-normal hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Vertical Separator Line */}
          <div className="self-stretch w-[1px] bg-[#e9e2d6]" />

          {/* Right Column */}
          <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
            {rightColumnTags.map((tag) => {
              const isActive = activeTagsList.includes(tag);
              const label = translateTag(tag, lang).toUpperCase();
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex items-center justify-start px-2.5 py-[3px] rounded-full text-[11px] font-open-sans transition-colors duration-200 select-none cursor-pointer border text-left break-words ${
                    isActive
                      ? "bg-[#ffe6e6] text-[#862633] border-[#862633] font-semibold"
                      : "bg-white text-[#3d3d3d] border-[#6e6660] font-normal hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}
