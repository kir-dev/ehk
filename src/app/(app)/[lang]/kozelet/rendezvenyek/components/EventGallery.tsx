"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Media } from "@/payload-types";
import { cn } from "@/lib/utils";

interface EventGalleryProps {
  images: Media[];
  label: string;
  prevLabel: string;
  nextLabel: string;
}

export function EventGallery({ images, label, prevLabel, nextLabel }: EventGalleryProps) {
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_DESKTOP = 3;

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE_DESKTOP < images.length;

  const visibleImages = images.slice(startIndex, startIndex + VISIBLE_DESKTOP);
  const emptySlots = Math.max(0, VISIBLE_DESKTOP - visibleImages.length);

  return (
    <div className="flex flex-col gap-1">
      <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{label}</p>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
          disabled={!canPrev}
          className={cn(
            "shrink-0 text-[#1a1a1a] transition-opacity rounded-full",
            !canPrev && "opacity-20 cursor-not-allowed"
          )}
          aria-label={prevLabel}
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
        </button>

        <div className="flex flex-1 gap-2 md:gap-4 min-w-0 overflow-hidden">
          {visibleImages.map((media, idx) => (
            <div
              key={media.id ?? idx}
              className="flex-1 relative rounded-2xl border border-[#e9e2d6] overflow-hidden bg-[#f9f4f0]"
              style={{ aspectRatio: "4/3" }}
            >
              {media.url && (
                <Image
                  src={media.url}
                  alt={media.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 30vw"
                />
              )}
            </div>
          ))}
          {Array.from({ length: emptySlots }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="flex-1 hidden md:block rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0]"
              style={{ aspectRatio: "4/3" }}
            />
          ))}
        </div>

        <button
          onClick={() => setStartIndex(Math.min(images.length - 1, startIndex + 1))}
          disabled={!canNext}
          className={cn(
            "shrink-0 text-[#1a1a1a] transition-opacity rounded-full",
            !canNext && "opacity-20 cursor-not-allowed"
          )}
          aria-label={nextLabel}
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
        </button>
      </div>
    </div>
  );
}
