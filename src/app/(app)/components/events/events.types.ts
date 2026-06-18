import { Event } from "@/payload-types"

export interface EventsListClientProps {
  lang: "hu" | "en"
  events: Event[]
  dictionary: Record<string, Record<string, string>>
}

export interface WeekMetadata {
  monday: Date
  sunday: Date
  index: number
}

export interface DayGroup {
  date: Date
  events: Event[]
}

export interface RenderedWeekData extends WeekMetadata {
  days: DayGroup[]
}

export interface Translations {
  thisWeek: string
  nextWeek: string
  time: string
  location: string
  link: string
  description: string
  share: string
  noEvents: string
}

export interface EventsTimelineProps {
  weeks: WeekMetadata[]
  activeWeekIndex: number
  timelineStartIdx: number
  startWeekIndex: number
  onWeekClick: (index: number) => void
  onShiftTimeline: (direction: "left" | "right") => void
  t: Translations
  lang: "hu" | "en"
  totalWeeksCount: number
}
