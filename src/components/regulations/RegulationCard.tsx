"use client"

import FileCard from "@/components/common/FileCard"
import { cn } from "@/lib/utils"
import type { Media, Regulation } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"

interface RegulationCardProps {
  /** Localized regulation title. */
  title: string
  /** Localized rich text description (Lexical editor state). */
  description?: Regulation["text_hu"] | null
  /** The downloadable regulation file. */
  file?: Media
  /** Localized label shown for the file inside the FileCard. */
  fileDisplayText?: string | null
  className?: string
}

/**
 * Presentational card for a single regulation: a title, a rich text
 * description, and a downloadable file at the bottom. The layout is shared
 * across the Educational, Benefits and Dormitory regulation pages, so the
 * component receives already-localized data and stays free of fetching/i18n
 * concerns. See issue #125.
 */
export default function RegulationCard({
  title,
  description,
  file,
  fileDisplayText,
  className,
}: RegulationCardProps) {
  const ext = file?.filename?.split(".").pop()?.toLowerCase()

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-4 md:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-playfair font-semibold text-base leading-[1.4] text-[#1a1a1a] break-words">
          {title}
        </h2>

        {description && (
          <div className="richtext font-open-sans text-sm leading-[1.6] text-[#3d3d3d] max-w-none">
            <RichText data={description} />
          </div>
        )}
      </div>

      {file && (
        <FileCard
          file={file}
          title={fileDisplayText || ext || "file"}
          actionType="view"
        />
      )}
    </article>
  )
}
