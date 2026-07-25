import Image from "next/image";
import { Media } from "@/payload-types";
import { Locale } from "@/i18n-config";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getSocialIcon, getSocialName, getSocialPriority } from "@/lib/social-utils";
import { EventGallery } from "./EventGallery";

interface EventCardLabels {
  leiras: string;
  gallery: string;
  links: string;
  prev_image: string;
  next_image: string;
}

interface EventLink {
  label: string;
  url: string;
}

interface EventCardProps {
  title: string;
  coverImage: Media | null;
  description: SerializedEditorState | null | undefined;
  galleryImages: Media[];
  links: EventLink[];
  lang: Locale;
  labels: EventCardLabels;
}

function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function EventCard({
  title,
  coverImage,
  description,
  galleryImages,
  links,
  lang,
  labels,
}: EventCardProps) {
  const validLinks = links
    .filter((link) => isValidUrl(link.url))
    .sort((a, b) => getSocialPriority(a.label) - getSocialPriority(b.label));

  return (
    <div className="w-full">
      {/* Title bar */}
      <div className="bg-[#fffefc] border-t border-x border-[#e9e2d6] px-6 md:px-8 py-4 rounded-tl-lg rounded-tr-lg flex items-center min-h-[77px]">
        <h2 className="font-playfair font-bold text-[22px] leading-[1.3] text-[#1a1a1a]">{title}</h2>
      </div>

      {/* Cover image */}
      <div className="relative w-full h-[200px] md:h-[312px] border-x border-[#e9e2d6] bg-[#f9f4f0]">
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ) : null}
      </div>

      {/* Body */}
      <div className="bg-[#fffefc] border border-[#e9e2d6] px-6 md:px-8 py-4 rounded-bl-lg rounded-br-lg flex flex-col gap-8">
        {/* LEÍRÁS */}
        {description ? (
          <div className="flex flex-col gap-1">
            <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{labels.leiras}</p>
            <div className="richtext font-open-sans text-sm text-[#1a1a1a] leading-[1.6]">
              <RichText data={description} />
            </div>
          </div>
        ) : null}

        {/* GALÉRIA */}
        {galleryImages.length > 0 ? (
          <EventGallery
            images={galleryImages}
            label={labels.gallery}
            prevLabel={labels.prev_image}
            nextLabel={labels.next_image}
          />
        ) : null}

        {/* LINKEK */}
        {validLinks.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{labels.links}</p>
            <div className="flex flex-wrap gap-2">
              {validLinks.map((link, idx) => (
                <a
                  key={`${link.url}-${idx}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#f9f4f0] border border-[#e9e2d6] text-[#1a1a1a] hover:bg-[#862633] hover:text-white hover:border-[#862633] text-sm font-bold font-open-sans leading-[1.6] px-4 py-2 rounded-full transition-colors"
                >
                  {getSocialIcon(link.label)}
                  {getSocialName(link.label, lang)}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
