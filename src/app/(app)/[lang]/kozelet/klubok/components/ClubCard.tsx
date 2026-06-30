import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ClubGallery } from "./ClubGallery";

interface ClubCardLabels {
  nyitas: string;
  helyszin: string;
  link: string;
  leiras: string;
  gallery: string;
}

interface ClubCardProps {
  title: string;
  coverImage: Media | null;
  openingHours: SerializedEditorState | null | undefined;
  location: string | null | undefined;
  link: string | null | undefined;
  description: SerializedEditorState | null | undefined;
  galleryImages: Media[];
  labels: ClubCardLabels;
}

function getLinkMeta(url: string): { label: string; isFacebook: boolean } {
  try {
    const parsed = new URL(url);
    const isFacebook = parsed.hostname.includes("facebook.com");
    const label = isFacebook ? "Facebook" : parsed.hostname.replace("www.", "");
    return { label, isFacebook };
  } catch {
    return { label: url, isFacebook: false };
  }
}

export function ClubCard({
  title,
  coverImage,
  openingHours,
  location,
  link,
  description,
  galleryImages,
  labels,
}: ClubCardProps) {
  const linkMeta = link ? getLinkMeta(link) : null;

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
            priority
          />
        ) : null}
      </div>

      {/* Info body */}
      <div className="bg-[#fffefc] border border-[#e9e2d6] px-6 md:px-8 py-4 rounded-bl-lg rounded-br-lg flex flex-col gap-8">
        {/* NYITÁS | HELYSZÍN | LINK row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{labels.nyitas}</p>
            {openingHours ? (
              <div className="richtext font-open-sans text-sm text-black leading-[1.6]">
                <RichText data={openingHours} />
              </div>
            ) : null}
          </div>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{labels.helyszin}</p>
            {location ? (
              <p className="font-open-sans text-sm text-black leading-[1.6]">{location}</p>
            ) : null}
          </div>

          {linkMeta && link ? (
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <p className="font-open-sans font-bold text-sm text-[#9a9a9a] leading-[1.6]">{labels.link}</p>
              <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-start">
                {linkMeta.isFacebook ? (
                  <span className="inline-flex items-center gap-1.5 bg-[#3b589f] text-white text-[11px] font-bold font-open-sans leading-[1.6] px-2 py-1 rounded-2xl">
                    <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {linkMeta.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-[#f9f4f0] border border-[#e9e2d6] text-[#1a1a1a] text-[11px] font-bold font-open-sans leading-[1.6] px-2 py-1 rounded-2xl">
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    {linkMeta.label}
                  </span>
                )}
              </a>
            </div>
          ) : null}
        </div>

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
          <ClubGallery images={galleryImages} label={labels.gallery} />
        ) : null}
      </div>
    </div>
  );
}
