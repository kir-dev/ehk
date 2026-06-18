"use client"

import React from "react"
import { useEventsLogic } from "./useEventsLogic"
import { EventsTimeline } from "./EventsTimeline"
import { EventCard } from "./EventCard"
import { formatWeekRange, DAYS_HU, DAYS_EN } from "./events.constants"
import { EventsListClientProps } from "./events.types"

export default function EventsListClient({ lang, events, dictionary }: Readonly<EventsListClientProps>) {
  const {
    t,
    weeks,
    activeWeekIndex,
    timelineStartIdx,
    expandedEventId,
    setExpandedEventId,
    copiedEventId,
    scrollContainerRef,
    observerRefs,
    renderedWeekData,
    handleWeekClick,
    shiftTimeline,
    handleShare,
    handleScroll,
    totalWeeksCount,
  } = useEventsLogic({ lang, events, dictionary })

  return (
    <div className="flex flex-col w-full">
      {/* Horizontal Weekly Timeline Slider */}
      <EventsTimeline
        weeks={weeks}
        activeWeekIndex={activeWeekIndex}
        timelineStartIdx={timelineStartIdx}
        onWeekClick={handleWeekClick}
        onShiftTimeline={shiftTimeline}
        t={t}
        lang={lang}
        totalWeeksCount={totalWeeksCount}
      />

      {/* Vertical Scroll View of Day-Grouped Events */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex flex-col w-full overflow-y-auto max-h-[650px] pr-2 scroll-smooth relative"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(134, 38, 51, 0.3) transparent" }}
      >
        {renderedWeekData.map((week) => {
          return (
            <div
              key={week.index}
              id={`week-section-${week.index}`}
              data-week-idx={week.index}
              ref={(el) => {
                observerRefs.current[`week-${week.index}`] = el
              }}
              className="scroll-mt-36"
            >
              {/* Divider if not first week */}
              {week.index > 0 && <hr className="border-[#e9e2d6] my-6" />}

              {/* Weekly Header for visual separation */}
              <div className="text-[11px] font-bold text-[#9a9a9a] uppercase tracking-wider mb-4 font-open-sans px-2">
                {week.index === 0 ? t.thisWeek : week.index === 1 ? t.nextWeek : ""} {formatWeekRange(week.monday, week.sunday, lang)}
              </div>

              {/* If no events this week, display empty helper */}
              {week.days.length === 0 ? (
                <div className="bg-[#fffefc] border border-dashed border-[#e9e2d6] rounded-xl py-10 px-4 text-center text-[#9a9a9a] text-sm mb-6">
                  {t.noEvents}
                </div>
              ) : (
                <div className="flex flex-col gap-6 mb-6">
                  {week.days.map((dayGroup) => {
                    const days = lang === "hu" ? DAYS_HU : DAYS_EN
                    const dayName = days[dayGroup.date.getDay()]
                    const dayNum = dayGroup.date.getDate()

                    return (
                      <div
                        key={dayGroup.date.toISOString()}
                        className="grid grid-cols-1 md:grid-cols-[108px_1fr] gap-4 md:gap-8 items-start w-full px-2"
                      >
                        {/* Day Column */}
                        <div className="flex md:flex-col items-baseline md:items-center justify-start md:justify-center gap-2 md:gap-1 p-2 md:py-4 shrink-0 w-fit md:w-[108px]">
                          <span className="text-[11px] font-bold text-[#9a9a9a] tracking-wider uppercase">
                            {dayName}
                          </span>
                          <span className="text-3xl font-playfair font-bold text-black leading-none">
                            {dayNum}
                          </span>
                        </div>

                        {/* Events list for that day */}
                        <div className="flex flex-col gap-3 flex-1 min-w-0">
                          {dayGroup.events.map((event) => {
                            const isExpanded = expandedEventId === event.id
                            return (
                              <EventCard
                                key={event.id}
                                event={event}
                                lang={lang}
                                isExpanded={isExpanded}
                                onToggle={() => setExpandedEventId(isExpanded ? null : event.id)}
                                onShare={handleShare}
                                copiedEventId={copiedEventId}
                                t={t}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
