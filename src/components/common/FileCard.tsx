"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";
import { getFileExtension } from "@/utils/file";
import { Download, Eye } from "lucide-react";

interface FileCardProps {
  file?: number | Media | { url?: string; filename?: string };
  title: string;
  actionType?: "view" | "download";
  actionLabel?: string;
  className?: string;
}

export default function FileCard({
  file,
  title,
  actionType = "view",
  actionLabel,
  className,
}: FileCardProps) {
  const { t } = useTranslate();

  // Helper to extract file info safely
  const getFileInfo = () => {
    if (!file || typeof file === "number") {
      return { url: "#", ext: "file" };
    }

    // Check if it's likely a Media object (has id and filename)
    if ("id" in file && "filename" in file) {
      return {
        url: file.url || "#",
        ext: getFileExtension(file as Media),
      };
    }

    // Fallback for simple object { url, filename }
    const simpleFile = file as { url?: string; filename?: string };
    return {
      url: simpleFile.url || "#",
      ext: simpleFile.filename?.split(".").pop()?.toLowerCase() || "file",
    };
  };

  const { url, ext } = getFileInfo();
  const hasFile = url !== "#";

  const handleView = () => {
    if (!hasFile) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const Icon = actionType === "view" ? Eye : Download;
  const defaultLabel =
    actionType === "view"
      ? t("Megtekintés", "View")
      : t("Letöltés", "Download");
  const label = actionLabel || defaultLabel;

  const buttonClassName =
    "inline-flex items-center gap-2 shrink-0 rounded-2xl border border-[#e9e2d6] bg-white px-4 py-2 text-xs text-[#3d3d3d] transition-colors duration-200 hover:bg-[#f9f4f0] hover:border-[#d3afaf] hover:text-[#862633] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

  const buttonContent = (
    <>
      <span className="whitespace-nowrap">{label}</span>
      <Icon className="h-4 w-4 shrink-0" />
    </>
  );

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 font-open-sans transition-colors duration-200 hover:border-[#d3afaf]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-sm leading-[1.6] text-black break-words transition-colors group-hover:text-[#862633]">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-[#e9e2d6] bg-[#f9f4f0] px-3 py-1 text-black whitespace-nowrap">
            {ext}
          </span>
        </div>
      </div>

      {actionType === "download" ? (
        <a
          href={hasFile ? url : undefined}
          download
          aria-disabled={!hasFile}
          className={cn(
            buttonClassName,
            !hasFile && "pointer-events-none opacity-50",
          )}
        >
          {buttonContent}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleView}
          disabled={!hasFile}
          className={buttonClassName}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
}
