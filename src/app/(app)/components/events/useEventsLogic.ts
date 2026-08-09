import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from "react"
import { Event } from "@/payload-types"
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  addDays,
  endOfDay,
} from "date-fns"
import {
  TOTAL_WEEKS_COUNT,
  SLIDING_WINDOW_SIZE,
  SCROLL_SPY_OFFSET_IN_CONTAINER,
  SCROLL_SPY_OFFSET_IN_VIEWPORT,
  VISIBLE_WEEKS_IN_TIMELINE,
  VISIBLE_WEEKS_IN_TIMELINE_MOBILE,
  TIMELINE_MOBILE_BREAKPOINT,
} from "./events.constants"
import { WeekMetadata, Translations } from "./events.types"

interface UseEventsLogicProps {
  lang: "hu" | "en"
  events: Event[]
  dictionary: Record<string, Record<string, string>>
}

const getEventInterval = (event: Event) => {
  const start = new Date(event.date.startDate)
  const end = new Date(event.date.endDate)

  return start <= end ? { start, end } : { start: end, end: start }
}

const intervalsOverlap = (
  first: { start: Date; end: Date },
  second: { start: Date; end: Date }
) => first.start <= second.end && first.end >= second.start

export function useEventsLogic({ lang, events, dictionary }: UseEventsLogicProps) {
  const t: Translations = useMemo(() => {
    const rendezvenyek = dictionary.rendezvenyek || {}
    return {
      thisWeek: rendezvenyek.this_week || (lang === "hu" ? "E HÉT" : "THIS WEEK"),
      nextWeek: rendezvenyek.next_week || (lang === "hu" ? "JÖVŐ HÉT" : "NEXT WEEK"),
      time: rendezvenyek.time || (lang === "hu" ? "IDŐPONT" : "TIME"),
      location: rendezvenyek.location || (lang === "hu" ? "HELYSZÍN" : "LOCATION"),
      link: rendezvenyek.link || (lang === "hu" ? "LINK" : "LINK"),
      description: rendezvenyek.description_label || (lang === "hu" ? "LEÍRÁS" : "DESCRIPTION"),
      share: rendezvenyek.share || (lang === "hu" ? "Megosztás" : "Share"),
      noEvents: rendezvenyek.no_events || (lang === "hu" ? "Nincsenek események ezen a héten." : "No events scheduled for this week."),
    }
  }, [dictionary, lang])

  // Active expanded accordion item ID
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
  
  // Start week index (initially 0, can go negative when prepended)
  const [startWeekIndex, setStartWeekIndex] = useState(0)

  // Total weeks count state (grows dynamically)
  const [totalWeeksCount, setTotalWeeksCount] = useState(TOTAL_WEEKS_COUNT)
  
  const baseDate = useMemo(() => new Date(), [])
  
  // Generate the weeks metadata based on totalWeeksCount starting from startWeekIndex
  const weeks = useMemo(() => {
    const list: WeekMetadata[] = []
    for (let i = 0; i < totalWeeksCount; i++) {
      const weekIdx = startWeekIndex + i
      const monday = startOfWeek(addWeeks(baseDate, weekIdx), { weekStartsOn: 1 })
      const sunday = endOfWeek(monday, { weekStartsOn: 1 })
      list.push({ monday, sunday, index: weekIdx })
    }
    return list
  }, [baseDate, startWeekIndex, totalWeeksCount])

  // Horizontal Timeline Carousel state (shows 3 weeks at a time, 2 below sm)
  const [timelineStartIdx, setTimelineStartIdx] = useState(0)

  // The timeline renders fewer buttons on narrow screens, so the window size has
  // to follow suit — otherwise the active week can land on a button that is not
  // rendered and no pill appears selected.
  const [visibleWeeks, setVisibleWeeks] = useState(VISIBLE_WEEKS_IN_TIMELINE)
  useEffect(() => {
    const query = window.matchMedia(TIMELINE_MOBILE_BREAKPOINT)
    const sync = () =>
      setVisibleWeeks(query.matches ? VISIBLE_WEEKS_IN_TIMELINE : VISIBLE_WEEKS_IN_TIMELINE_MOBILE)

    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])
  
  // Current active week index highlighted (0 to 7+)
  const [activeWeekIndex, setActiveWeekIndex] = useState(0)

  // Sliding window visible weeks state
  const [visibleWeeksStartIdx, setVisibleWeeksStartIdx] = useState(0)
  const prevStartIdx = useRef(0)
  const lastRemovedHeight = useRef(0)
  
  // Track if scrolling is manual (to ignore scroll-spy updates during timeline clicks)
  const isManualScrolling = useRef(false)
  // Track if the sliding window layout is shifting to ignore layout-induced scroll events
  const isLayoutShifting = useRef(false)
  const [copiedEventId, setCopiedEventId] = useState<number | null>(null)
  const observerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Group events by day for a given week range
  const getWeekEvents = useCallback((monday: Date, sunday: Date) => {
    const weekInterval = { start: monday, end: sunday }
    const filtered = events.filter((e) => {
      return intervalsOverlap(getEventInterval(e), weekInterval)
    })

    // Group by day of week (Monday to Sunday)
    const daysList = []
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(monday, i)
      const dayInterval = { start: currentDay, end: endOfDay(currentDay) }
      const dayEvents = filtered
        .filter((e) => intervalsOverlap(getEventInterval(e), dayInterval))
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
    let currentStart = startWeekIndex
    
    if (index >= startWeekIndex + totalWeeksCount - 3) {
      currentTotal = totalWeeksCount + 4
      setTotalWeeksCount(currentTotal)
    }
    
    if (index <= startWeekIndex + 2) {
      currentStart = startWeekIndex - 4
      currentTotal = totalWeeksCount + 4
      setStartWeekIndex(currentStart)
      setTotalWeeksCount(currentTotal)
    }
    
    // Shift visible weeks window so that the clicked week index is in the visible range
    const newStartIdx = Math.max(currentStart, Math.min(currentStart + currentTotal - SLIDING_WINDOW_SIZE, index - 2))
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
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - SCROLL_SPY_OFFSET_IN_VIEWPORT
          
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
    if (direction === "left") {
      if (timelineStartIdx <= startWeekIndex + 2) {
        setStartWeekIndex((prev) => prev - 4)
        setTotalWeeksCount((prev) => prev + 4)
      }
      setTimelineStartIdx((prev) => prev - 1)
    } else if (direction === "right") {
      if (timelineStartIdx < startWeekIndex + totalWeeksCount - visibleWeeks) {
        // If we are moving right and getting close to the end of the timeline, generate more weeks
        if (timelineStartIdx >= startWeekIndex + totalWeeksCount - 5) {
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
    } else if (activeWeekIndex >= timelineStartIdx + visibleWeeks) {
      setTimelineStartIdx(
        Math.min(startWeekIndex + totalWeeksCount - visibleWeeks, activeWeekIndex - (visibleWeeks - 1)),
      )
    }
  }, [activeWeekIndex, timelineStartIdx, startWeekIndex, totalWeeksCount, visibleWeeks])

  // Handle scroll events inside the events container
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // 1. Scroll-spy: Highlight current active week in the timeline navigation
    if (isManualScrolling.current || isLayoutShifting.current) return

    const elements = Object.entries(observerRefs.current)
      .map(([key, el]) => ({ key, el, index: Number(el?.getAttribute("data-week-idx")) }))
      .filter((item): item is { key: string; el: HTMLDivElement; index: number } => item.el !== null && !isNaN(item.index))

    let bestWeekIdx = -1
    let minDistance = Infinity

    // Below md the container has no max-height, so the page scrolls instead of
    // the container. Express the target line in container coordinates either way,
    // since offsetTop is measured against the (position: relative) container.
    const targetScrollTop = container.scrollHeight > container.clientHeight
      ? container.scrollTop + SCROLL_SPY_OFFSET_IN_CONTAINER
      : SCROLL_SPY_OFFSET_IN_VIEWPORT - container.getBoundingClientRect().top

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

      let currentTotal = totalWeeksCount
      let currentStart = startWeekIndex

      // If we are close to the end of currently generated weeks, append more weeks dynamically
      if (bestWeekIdx >= startWeekIndex + totalWeeksCount - 3) {
        currentTotal = totalWeeksCount + 4
        setTotalWeeksCount(currentTotal)
      }

      // If we are close to the start of currently generated weeks, prepend more weeks dynamically
      if (bestWeekIdx <= startWeekIndex + 2) {
        currentStart = startWeekIndex - 4
        currentTotal = totalWeeksCount + 4
        setStartWeekIndex(currentStart)
        setTotalWeeksCount(currentTotal)
      }

      // 2. Sliding window check: keep visibleWeeksStartIdx at bestWeekIdx - 2
      const targetVisibleStart = bestWeekIdx - 2

      if (visibleWeeksStartIdx < targetVisibleStart && visibleWeeksStartIdx < currentStart + currentTotal - SLIDING_WINDOW_SIZE) {
        isLayoutShifting.current = true
        // Measure the height of the week we are about to remove at the top
        const el = document.getElementById(`week-section-${visibleWeeksStartIdx}`)
        if (el) {
          lastRemovedHeight.current = el.offsetHeight
        }
        setVisibleWeeksStartIdx((prev) => Math.min(currentStart + currentTotal - SLIDING_WINDOW_SIZE, prev + 1))
      }
      else if (visibleWeeksStartIdx > targetVisibleStart && visibleWeeksStartIdx > currentStart) {
        isLayoutShifting.current = true
        setVisibleWeeksStartIdx((prev) => Math.max(currentStart, prev - 1))
      }
    }
  }, [visibleWeeksStartIdx, startWeekIndex, totalWeeksCount])

  // When the container is not scrollable (mobile), its onScroll never fires, so
  // the page scroll has to drive the scroll-spy and the sliding window instead.
  useEffect(() => {
    const onWindowScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return
      if (container.scrollHeight > container.clientHeight) return
      handleScroll()
    }

    window.addEventListener("scroll", onWindowScroll, { passive: true })
    return () => window.removeEventListener("scroll", onWindowScroll)
  }, [handleScroll])

  // Pre-calculate grouped events for the 4 weeks in the sliding window
  const renderedWeekData = useMemo(() => {
    const sliceStart = visibleWeeksStartIdx - startWeekIndex
    return weeks.slice(sliceStart, sliceStart + SLIDING_WINDOW_SIZE).map((w) => ({
      ...w,
      days: getWeekEvents(w.monday, w.sunday),
    }))
  }, [weeks, visibleWeeksStartIdx, startWeekIndex, getWeekEvents])

  // Sync scroll offset layout changes when sliding window shifts
  useLayoutEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const diff = visibleWeeksStartIdx - prevStartIdx.current
    // Mobile scrolls the page, so compensate there instead of on the container.
    const isContainerScrollable = container.scrollHeight > container.clientHeight

    if (diff > 0) {
      if (isContainerScrollable) {
        container.scrollTop = Math.max(0, container.scrollTop - lastRemovedHeight.current)
      } else {
        window.scrollBy(0, -lastRemovedHeight.current)
      }
    } else if (diff < 0) {
      let addedHeight = 0
      for (let i = visibleWeeksStartIdx; i < prevStartIdx.current; i++) {
        const el = document.getElementById(`week-section-${i}`)
        if (el) addedHeight += el.offsetHeight
      }
      if (isContainerScrollable) {
        container.scrollTop = container.scrollTop + addedHeight
      } else {
        window.scrollBy(0, addedHeight)
      }
    }
    prevStartIdx.current = visibleWeeksStartIdx

    // Reset layout shifting flag after scroll events have fired
    const timeoutId = setTimeout(() => {
      isLayoutShifting.current = false
    }, 100)

    return () => clearTimeout(timeoutId)
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
            
            let currentStart = startWeekIndex
            let currentTotal = totalWeeksCount
            
            if (diffInWeeks < startWeekIndex) {
              const needed = startWeekIndex - diffInWeeks
              const prependChunks = Math.ceil(needed / 4) * 4
              currentStart = startWeekIndex - prependChunks
              currentTotal = totalWeeksCount + prependChunks
              setStartWeekIndex(currentStart)
              setTotalWeeksCount(currentTotal)
            } else if (diffInWeeks >= startWeekIndex + totalWeeksCount - 3) {
              const needed = diffInWeeks - (startWeekIndex + totalWeeksCount - 3)
              const appendChunks = Math.ceil(needed / 4) * 4
              currentTotal = totalWeeksCount + appendChunks
              setTotalWeeksCount(currentTotal)
            }
            
            const weekIdx = diffInWeeks
            setActiveWeekIndex(weekIdx)
            const newStartIdx = Math.max(currentStart, Math.min(currentStart + currentTotal - SLIDING_WINDOW_SIZE, weekIdx - 2))
            setVisibleWeeksStartIdx(newStartIdx)
            
            // Wait for DOM rendering before scrolling
            setTimeout(() => {
              const target = document.getElementById(`week-section-${weekIdx}`)
              const container = scrollContainerRef.current
              if (container && target) {
                if (container.scrollHeight > container.clientHeight) {
                  container.scrollTo({ top: target.offsetTop, behavior: "smooth" })
                } else {
                  // Mobile: the page scrolls, not the container.
                  window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - SCROLL_SPY_OFFSET_IN_VIEWPORT,
                    behavior: "smooth",
                  })
                }
              }
            }, 300)
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
    startWeekIndex,
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
    visibleWeeks,
  }
}
