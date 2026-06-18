import React from "react"
import { Event, Media } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import Image from "next/image"
import { ChevronDown, ChevronUp, MapPin, Facebook, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Translations } from "./events.types"

interface EventCardProps {
  event: Event
  lang: "hu" | "en"
  isExpanded: boolean
  onToggle: () => void
  onShare: (e: React.MouseEvent, eventId: number) => void
  copiedEventId: number | null
  t: Translations
}

export function EventCard({
  event,
  lang,
  isExpanded,
  onToggle,
  onShare,
  copiedEventId,
  t,
}: Readonly<EventCardProps>) {
  const eventTitle = lang === "hu" ? event.title_hu : event.title_en
  const eventLoc = lang === "hu" ? event.location?.location_hu : event.location?.location_en
  const eventDesc = lang === "hu" ? event.detailedDescription?.description_hu : event.detailedDescription?.description_en
  const eventImg = event.image as Media | undefined

  // Extract formatted start time
  const startDt = new Date(event.date.startDate)
  const timeStr = startDt.toLocaleTimeString(lang === "hu" ? "hu-HU" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Collapsed Header Bar */}
      <div
        onClick={onToggle}
        className={cn(
          "bg-[#fffefc] border border-[#e9e2d6] shadow-sm hover:shadow transition-shadow flex items-center pl-1 pr-6 py-4 cursor-pointer select-none",
          isExpanded ? "rounded-t-lg" : "rounded-lg"
        )}
      >
        {/* Accent Line */}
        <div className="w-1 h-10 bg-[#862633] rounded-full mr-4 shrink-0" />

        {/* Info details */}
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 min-w-0">
          <span className="font-open-sans font-bold text-[16px] text-[#1a1a1a] shrink-0 sm:w-16">
            {timeStr}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-open-sans font-bold text-[16px] text-[#1a1a1a] truncate">
              {eventTitle}
            </h3>
            {eventLoc && (
              <div className="flex items-center gap-1 text-[13px] text-[#9a9a9a] mt-0.5 sm:hidden">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{eventLoc}</span>
              </div>
            )}
          </div>
          {eventLoc && (
            <div className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#9a9a9a] max-w-[250px] shrink-0 mr-4">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#862633]/70" />
              <span className="truncate">{eventLoc}</span>
            </div>
          )}
        </div>

        {/* Arrow Toggle */}
        <div className="text-[#862633] shrink-0 ml-4">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>

      {/* Accordion Collapsible Detail Drawer */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out border-b border-l border-r border-[#e9e2d6] bg-[#fffefc] rounded-b-lg overflow-hidden",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 border-none pointer-events-none"
        )}
      >
        <div className="overflow-hidden flex flex-col w-full">
          {/* Cover Image Banner */}
          {eventImg?.url && (
            <div className="relative w-full h-[194px] overflow-hidden bg-slate-50 border-b border-[#e9e2d6]">
              <Image
                src={eventImg.url}
                alt={eventImg.alt || eventTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          )}

          {/* Body Container */}
          <div className="p-6 md:p-8 flex flex-col gap-6 w-full">
            {/* Info row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#e9e2d6]/60 pb-6 w-full">
              {/* Date/Time info */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-wider font-open-sans">
                  {t.time}
                </span>
                <span className="text-[14px] font-open-sans text-black leading-relaxed">
                  {timeStr}
                </span>
              </div>

              {/* Venue Location info */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-wider font-open-sans">
                  {t.location}
                </span>
                <span className="text-[14px] font-open-sans text-black leading-relaxed truncate">
                  {eventLoc || "-"}
                </span>
              </div>

              {/* CTA Links info */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-wider font-open-sans">
                  {t.link}
                </span>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Facebook Event Link */}
                  {event.facebookUrl && (
                    <a
                      href={event.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3b589f] hover:bg-[#2d4373] text-white flex gap-1.5 items-center px-3 py-1 rounded-full text-[11px] font-bold font-open-sans transition-colors cursor-pointer w-fit"
                    >
                      <Facebook className="h-3.5 w-3.5 fill-white" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {/* Share Button */}
                  <button
                    onClick={(e) => onShare(e, event.id)}
                    className={cn(
                      "border border-solid border-[#9a9a9a] hover:bg-slate-50 flex gap-1.5 items-center px-3 py-1 rounded-full text-[11px] font-bold font-open-sans transition-all cursor-pointer w-fit",
                      copiedEventId === event.id ? "text-green-600 border-green-600 bg-green-50/50" : "text-[#6e6660]"
                    )}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedEventId === event.id ? (lang === "hu" ? "Másolva!" : "Copied!") : t.share}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description block */}
            {eventDesc && (
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-wider font-open-sans">
                  {t.description}
                </span>
                <div className="text-[14px] text-[#1a1a1a] leading-relaxed richtext font-open-sans max-w-none text-justify">
                  <RichText data={eventDesc} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
