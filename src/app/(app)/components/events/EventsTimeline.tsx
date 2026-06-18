import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatWeekRange } from "./events.constants"
import { EventsTimelineProps } from "./events.types"

export function EventsTimeline({
  weeks,
  activeWeekIndex,
  timelineStartIdx,
  onWeekClick,
  onShiftTimeline,
  t,
  lang,
  totalWeeksCount,
}: Readonly<EventsTimelineProps>) {
  return (
    <div 
      className="bg-[#862633] text-white flex gap-2 h-14 items-center px-4 py-2 relative rounded-2xl w-full shadow-md mb-8 select-none"
      data-name="Timeline"
    >
      {/* Left Arrow */}
      <button
        onClick={() => onShiftTimeline("left")}
        disabled={timelineStartIdx === 0}
        className={cn(
          "h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0",
          timelineStartIdx === 0 && "opacity-30 cursor-not-allowed"
        )}
        aria-label="Previous weeks"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Weeks Slider Container */}
      <div className="flex flex-1 gap-2 overflow-hidden justify-center items-center h-full">
        {weeks.slice(timelineStartIdx, timelineStartIdx + 3).map((week) => {
          const isActive = activeWeekIndex === week.index
          const weekLabel = formatWeekRange(week.monday, week.sunday, lang)
          
          // Localized custom label for current/next week
          let prefix = ""
          if (week.index === 0) prefix = t.thisWeek
          else if (week.index === 1) prefix = t.nextWeek

          return (
            <button
              key={week.index}
              onClick={() => onWeekClick(week.index)}
              className={cn(
                "flex-1 flex flex-col justify-center items-center h-10 px-2 rounded-lg font-open-sans border border-solid transition-all duration-200 cursor-pointer min-w-0 max-w-[280px]",
                isActive
                  ? "bg-white/10 border-[#d3afaf] text-white font-bold"
                  : "bg-[#fffefc] border-[#d3afaf] text-[#6e6660] hover:bg-white/95 font-semibold"
              )}
            >
              {prefix && (
                <span className="text-[10px] tracking-wide uppercase leading-none opacity-85 mb-0.5">
                  {prefix}
                </span>
              )}
              <span className="text-xs leading-none">
                {weekLabel}
              </span>
            </button>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => onShiftTimeline("right")}
        disabled={timelineStartIdx >= totalWeeksCount - 3}
        className={cn(
          "h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0",
          timelineStartIdx >= totalWeeksCount - 3 && "opacity-30 cursor-not-allowed"
        )}
        aria-label="Next weeks"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
