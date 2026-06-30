"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string; // fallback for subtitle (backward compatibility)
  tags?: string[];
  onBack?: () => void;
  backHref?: string;
  backLabel?: string; // optional custom back button label
}

export function PageHeader({
  title,
  subtitle,
  description,
  tags,
  onBack,
  backHref,
  backLabel,
}: PageHeaderProps) {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang;
  const isEn = lang === "en";
  const displaySubtitle = subtitle || description;
  const resolvedBackLabel = backLabel || (isEn ? "Back" : "Vissza");

  const handleBack = (e: React.MouseEvent) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    } else if (!backHref) {
      e.preventDefault();
      router.back();
    }
  };

  const buttonContent = (
    <>
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      <span className="font-open-sans font-bold text-sm leading-none pt-px">{resolvedBackLabel}</span>
    </>
  );

  const buttonClassName = "group inline-flex items-center gap-2 bg-[#862633] hover:bg-[#9e2d3e] text-white border border-[#e9e2d6] px-4 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-sm cursor-pointer";

  return (
    <div className="w-full flex flex-col items-start select-none">
      {/* Top Bar (Back Button) */}
      <div className="w-full bg-[#fffefc] border-t border-x border-[#e9e2d6] px-6 py-4 md:px-8 md:py-4 flex items-center justify-between rounded-t-2xl">
        {backHref && !onBack ? (
          <Link href={backHref} className={buttonClassName}>
            {buttonContent}
          </Link>
        ) : (
          <button onClick={handleBack} className={buttonClassName} type="button">
            {buttonContent}
          </button>
        )}
      </div>

      {/* Title Banner */}
      <div className="w-full bg-[#862633] border border-[#e9e2d6] p-6 md:p-8 flex flex-col gap-3 md:gap-4 items-start text-white">
        {/* Optional Tags/Breadcrumbs */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-open-sans font-bold uppercase tracking-wider text-[#f9f4f0]/80">
            {tags.map((tag, index) => (
              <React.Fragment key={`${tag}-${index}`}>
                {index > 0 && <span className="opacity-50 font-normal">/</span>}
                <span className="hover:text-white transition-colors cursor-default">{tag}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-playfair font-bold text-3xl md:text-[32px] leading-tight tracking-normal text-white uppercase break-words w-full">
          {title}
        </h1>

        {/* Optional Subtitle */}
        {displaySubtitle && (
          <p className="font-playfair font-semibold text-[15px] md:text-[16px] leading-[1.4] text-[#f9f4f0]/90 w-full">
            {displaySubtitle}
          </p>
        )}
      </div>
    </div>
  );
}
