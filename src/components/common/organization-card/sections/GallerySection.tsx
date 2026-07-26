"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import type { Locale } from "@/i18n-config";

import type { OrganizationGalleryImage } from "../types";
import { getImageAlt, resolveImageSrc } from "../utils";
import { Section } from "./Section";

export function GallerySection({
  title,
  images,
  imageBasePath,
  organizationName,
  locale,
}: Readonly<{
  title: string;
  images?: readonly OrganizationGalleryImage[];
  imageBasePath: string;
  organizationName: string;
  locale: Locale;
}>) {
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!images?.length) {
    return null;
  }

  const scroll = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * carouselRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  const buttonClassName =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ehk-light-red transition-colors hover:bg-[#f9f4f0] hover:text-ehk-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red sm:h-12 sm:w-12";
  const previousLabel =
    locale === "en" ? `${title} – previous` : `${title} – előző`;
  const nextLabel = locale === "en" ? `${title} – next` : `${title} – következő`;

  return (
    <Section title={title}>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={previousLabel}
          className={buttonClassName}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={carouselRef}
          className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={`${resolveImageSrc(image, imageBasePath)}-${index}`}
              className="relative aspect-[1.4] w-[min(70vw,320px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-[#f9f4f0] md:w-[calc((100%-2rem)/3)]"
            >
              <Image
                src={resolveImageSrc(image, imageBasePath)}
                alt={getImageAlt(image, organizationName, index)}
                fill
                sizes="(max-width: 767px) 70vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={nextLabel}
          className={buttonClassName}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </Section>
  );
}
