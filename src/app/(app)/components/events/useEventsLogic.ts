import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from "react"
import { Event } from "@/payload-types"
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  isWithinInterval,
  isSameDay,
  addDays,
} from "date-fns"
import { TOTAL_WEEKS_COUNT, SLIDING_WINDOW_SIZE } from "./events.constants"
import { WeekMetadata, Translations } from "./events.types"

interface UseEventsLogicProps {
  lang: "hu" | "en"
  events: Event[]
  dictionary: Record<string, Record<string, string>>
}

export function useEventsLogic({ lang, events, dictionary }: UseEventsLogicProps) {
  const t: Translations = useMemo(() => {
    const rendezvenyek = dictionary.rendezvenyek || {}
    return {
      thisWeek: rendezvenyek.this_week || (lang === "hu" ? "E HÉT" : "THIS WEEK"),
      nextWeek: rendezvenyek.next_week || (lang === "hu" ? "JÖVŐ HÉT" : "NEXT WEEK"),
      time: rendezvenyek.time || (lang === "hu" ? "IDŐPONT" : "TIME"),
      location: rendezvenyek.location || (lang === "hu" ? "HELYSZÍN" : "LOCATION"),
      link: rendezvenyek.link || (lang === "hu" ? "LINK" : "LINK"),
      description: rendezvenyek.description || (lang === "hu" ? "LEÍRÁS" : "DESCRIPTION"),
      share: rendezvenyek.share || (lang === "hu" ? "Megosztás" : "Share"),
      noEvents: rendezvenyek.no_events || (lang === "hu" ? "Nincsenek események ezen a héten." : "No events scheduled for this week."),
    }
  }, [dictionary, lang])

  // Active expanded accordion item ID
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
  
  // Total weeks count state (grows dynamically)
  const [totalWeeksCount, setTotalWeeksCount] = useState(TOTAL_WEEKS_COUNT)
  
  const baseDate = useMemo(() => new Date(), [])
  
  // Generate the weeks metadata based on totalWeeksCount
  const weeks = useMemo(() => {
    const list: WeekMetadata[] = []
    for (let i = 0; i < totalWeeksCount; i++) {
      const monday = startOfWeek(addWeeks(baseDate, i), { weekStartsOn: 1 })
      const sunday = endOfWeek(monday, { weekStartsOn: 1 })
      list.push({ monday, sunday, index: i })
    }
    return list
  }, [baseDate, totalWeeksCount])

  // Horizontal Timeline Carousel state (shows 3 weeks at a time)
  const [timelineStartIdx, setTimelineStartIdx] = useState(0)
  
  // Current active week index highlighted (0 to 7+)
  const [activeWeekIndex, setActiveWeekIndex] = useState(0)

  // Sliding window visible weeks state
  const [visibleWeeksStartIdx, setVisibleWeeksStartIdx] = useState(0)
  const prevStartIdx = useRef(0)
  const lastRemovedHeight = useRef(0)
  
  // Track if scrolling is manual (to ignore scroll-spy updates during timeline clicks)
  const isManualScrolling = useRef(false)
  const [copiedEventId, setCopiedEventId] = useState<number | null>(null)
  const observerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Group events by day for a given week range
  const getWeekEvents = useCallback((monday: Date, sunday: Date) => {
    // Filter events starting in this week
    const weekInterval = { start: monday, end: sunday }
    const filtered = events.filter((e) => {
      const eventStart = new Date(e.date.startDate)
      return isWithinInterval(eventStart, weekInterval)
    })

    // Group by day of week (Monday to Sunday)
    const daysList = []
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(monday, i)
      const dayEvents = filtered
        .filter((e) => isSameDay(new Date(e.date.startDate), currentDay))
        .sort((a, b) => new Date(a.date.startDate).getTime() - new Date(b.date.startDate).getTime())

      if (dayEvents.length > 0) {
        daysList.push({
          date: currentDay,
          events: dayEvents,
        })
      }
    }
    return daysList
  }, [events])

  // Handle timeline week click
  const handleWeekClick = (index: number) => {
    isManualScrolling.current = true
    setActiveWeekIndex(index)
    
    let currentTotal = totalWeeksCount
    if (index >= totalWeeksCount - 3) {
      currentTotal = totalWeeksCount + 4
      setTotalWeeksCount(currentTotal)
    }
    
    // Shift visible weeks window so that the clicked week index is in the visible range
    const newStartIdx = Math.max(0, Math.min(currentTotal - SLIDING_WINDOW_SIZE, index - 1))
    setVisibleWeeksStartIdx(newStartIdx)

    // Scroll to the week section
    setTimeout(() => {
      const target = document.getElementById(`week-section-${index}`)
      const container = scrollContainerRef.current
      if (container && target) {
        const isContainerScrollable = container.scrollHeight > container.clientHeight
        
        if (isContainerScrollable) {
          const targetOffset = target.offsetTop
          container.scrollTo({
            top: targetOffset,
            behavior: "smooth",
          })
        } else {
          // Scroll the global window to the week section
          const headerOffset = 140
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }

        const handleScrollEnd = () => {
          isManualScrolling.current = false
        }

        setTimeout(handleScrollEnd, 1000)
      } else {
        isManualScrolling.current = false
      }
    }, 50)
  }

  // Shift horizontal timeline view window
  const shiftTimeline = (direction: "left" | "right") => {
    if (direction === "left" && timelineStartIdx > 0) {
      setTimelineStartIdx((prev) => prev - 1)
    } else if (direction === "right") {
      if (timelineStartIdx < totalWeeksCount - 3) {
        // If we are moving right and getting close to the end of the timeline, generate more weeks
        if (timelineStartIdx >= totalWeeksCount - 5) {
          setTotalWeeksCount((prev) => prev + 4)
        }
        setTimelineStartIdx((prev) => prev + 1)
      }
    }
  }

  // Shift timeline sliding window if the active week index is outside the visible 3 weeks
  useEffect(() => {
    if (activeWeekIndex < timelineStartIdx) {
      setTimelineStartIdx(activeWeekIndex)
    } else if (activeWeekIndex >= timelineStartIdx + 3) {
      setTimelineStartIdx(Math.min(totalWeeksCount - 3, activeWeekIndex - 2))
    }
  }, [activeWeekIndex, timelineStartIdx, totalWeeksCount])

  // Handle scroll events inside the events container
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // 1. Scroll-spy: Highlight current active week in the timeline navigation
    if (isManualScrolling.current) return

    const elements = Object.entries(observerRefs.current)
      .map(([key, el]) => ({ key, el, index: Number(el?.getAttribute("data-week-idx")) }))
      .filter((item): item is { key: string; el: HTMLDivElement; index: number } => item.el !== null && !isNaN(item.index))

    let bestWeekIdx = -1
    let minDistance = Infinity
    
    // Offset target line (e.g. 40px) inside the scroll container
    const targetScrollTop = container.scrollTop + 40

    for (const { el, index } of elements) {
      if (!el) continue
      const top = el.offsetTop
      const bottom = top + el.offsetHeight
      
      // If the element spans across targetScrollTop
      if (top <= targetScrollTop && bottom >= targetScrollTop) {
        bestWeekIdx = index
        break
      }
      
      const distance = Math.abs(top - targetScrollTop)
      if (distance < minDistance) {
        minDistance = distance
        bestWeekIdx = index
      }
    }

    if (bestWeekIdx !== -1) {
      setActiveWeekIndex(bestWeekIdx)

      // If we are close to the end of currently generated weeks, append more weeks dynamically
      let currentTotal = totalWeeksCount
      if (bestWeekIdx >= totalWeeksCount - 3) {
        currentTotal = totalWeeksCount + 4
        setTotalWeeksCount(currentTotal)
      }

      // 2. Sliding window check: if activeWeekIndex shifts, shift the visible weeks range!
      if (bestWeekIdx > visibleWeeksStartIdx && visibleWeeksStartIdx < currentTotal - SLIDING_WINDOW_SIZE) {
        // Measure the height of the week we are about to remove at the top
        const el = document.getElementById(`week-section-${visibleWeeksStartIdx}`)
        if (el) {
          lastRemovedHeight.current = el.offsetHeight
        }
        setVisibleWeeksStartIdx((prev) => Math.min(currentTotal - SLIDING_WINDOW_SIZE, prev + 1))
      }
      else if (bestWeekIdx < visibleWeeksStartIdx && visibleWeeksStartIdx > 0) {
        setVisibleWeeksStartIdx((prev) => Math.max(0, prev - 1))
      }
    }
  }, [visibleWeeksStartIdx, totalWeeksCount])

  // Pre-calculate grouped events for the 4 weeks in the sliding window
  const renderedWeekData = useMemo(() => {
    return weeks.slice(visibleWeeksStartIdx, visibleWeeksStartIdx + SLIDING_WINDOW_SIZE).map((w) => ({
      ...w,
      days: getWeekEvents(w.monday, w.sunday),
    }))
  }, [weeks, visibleWeeksStartIdx, getWeekEvents])

  // Sync scroll offset layout changes when sliding window shifts
  useLayoutEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const diff = visibleWeeksStartIdx - prevStartIdx.current

    if (diff > 0) {
      container.scrollTop = Math.max(0, container.scrollTop - lastRemovedHeight.current)
    } else if (diff < 0) {
      let addedHeight = 0
      for (let i = visibleWeeksStartIdx; i < prevStartIdx.current; i++) {
        const el = document.getElementById(`week-section-${i}`)
        if (el) addedHeight += el.offsetHeight
      }
      container.scrollTop = container.scrollTop + addedHeight
    }
    prevStartIdx.current = visibleWeeksStartIdx
  }, [visibleWeeksStartIdx])

  // Parse event query parameter on mount to expand and scroll to specific event
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const eventParam = params.get("event")
      if (eventParam) {
        const eventId = Number(eventParam)
        if (!isNaN(eventId)) {
          setExpandedEventId(eventId)
          
          // Find the event to determine its week
          const targetEvent = events.find((e) => e.id === eventId)
          if (targetEvent) {
            const eventDate = new Date(targetEvent.date.startDate)
            
            // Calculate how many weeks eventDate is from baseDate
            const diffInTime = eventDate.getTime() - startOfWeek(baseDate, { weekStartsOn: 1 }).getTime()
            const diffInWeeks = Math.floor(diffInTime / (7 * 24 * 60 * 60 * 1000))
            
            if (diffInWeeks >= 0) {
              const weekIdx = diffInWeeks
              
              // Grow totalWeeksCount if needed
              if (weekIdx >= totalWeeksCount - 3) {
                setTotalWeeksCount(weekIdx + 4)
              }
              
              setActiveWeekIndex(weekIdx)
              const newStartIdx = Math.max(0, Math.min(Math.max(totalWeeksCount, weekIdx + 4) - SLIDING_WINDOW_SIZE, weekIdx - 1))
              setVisibleWeeksStartIdx(newStartIdx)
              
              // Wait for DOM rendering before scrolling
              setTimeout(() => {
                const target = document.getElementById(`week-section-${weekIdx}`)
                const container = scrollContainerRef.current
                if (container && target) {
                  const targetOffset = target.offsetTop
                  container.scrollTo({
                    top: targetOffset,
                    behavior: "smooth",
                  })
                }
              }, 300)
            }
          }
        }
      }
    }
    // Only run on mount or when events list is loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  // Share link handler
  const handleShare = (e: React.MouseEvent, eventId: number) => {
    e.stopPropagation()
    const shareUrl = `${window.location.origin}${window.location.pathname}?tab=events&event=${eventId}`
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopiedEventId(eventId)
          setTimeout(() => setCopiedEventId(null), 2000)
        })
        .catch(() => {})
    }
  }

  return {
    t,
    weeks,
    activeWeekIndex,
    timelineStartIdx,
    visibleWeeksStartIdx,
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
  }
}
