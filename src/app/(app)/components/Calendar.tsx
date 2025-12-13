"use client";

import * as React from "react";
import { Event } from "@/payload-types";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { hu, enUS } from "react-day-picker/locale";
import EventCard from "@/app/(app)/components/EventCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/common/LanguageProvider";
// Helper function to get all dates between start and end date
function getDatesBetween(startDate: string, endDate: string): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: Date[] = [];

  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// Stable local date key: YYYY-MM-DD in local time to avoid timezone issues
function dateKeyLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface EventCalendarProps {
  events: Event[];
  className?: string;
}

export default function EventCalendar({
  events,
  className,
}: EventCalendarProps) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const { lang } = useLanguage();
  const locale = lang === "EN" ? enUS : hu;

  const {
    eventsByDay,
    highlightedDays,
  }: {
    eventsByDay: Map<string, { date: Date; events: Event[] }>;
    highlightedDays: Date[];
  } = useMemo(() => {
    const eventsByDay: Map<string, { date: Date; events: Event[] }> = new Map();
    const highlightedDays: Date[] = [];
    events.forEach((event) => {
      const eventDays = getDatesBetween(
        event.date.startDate,
        event.date.endDate
      );
      eventDays.forEach((eventDay) => {
        const key = dateKeyLocal(eventDay);
        const current = eventsByDay.get(key)?.events;
        if (current) {
          current.push(event);
        } else {
          eventsByDay.set(key, { date: eventDay, events: [event] });
        }
        highlightedDays.push(eventDay);
      });
    });
    return { eventsByDay: eventsByDay, highlightedDays };
  }, [events]);

  const handleReturn = () => {
    setSelectedEvents([]);
  };
  const handleNextEvent = () => {
    setSelectedEventIndex((prev) => prev + 1);
  };
  const handlePreviousEvent = () => {
    setSelectedEventIndex((prev) => prev - 1);
  };
  const hasNextEvent = useMemo(() => {
    return selectedEventIndex < selectedEvents.length - 1;
  }, [selectedEventIndex, selectedEvents]);
  const hasPreviousEvent = useMemo(() => {
    return selectedEventIndex > 0;
  }, [selectedEventIndex]);
  if (selectedEvents.length > 0) {
    return (
      <EventCard
        event={selectedEvents[selectedEventIndex]}
        onReturn={handleReturn}
        className={className}
        nextEvent={hasNextEvent ? handleNextEvent : undefined}
        previousEvent={hasPreviousEvent ? handlePreviousEvent : undefined}
      />
    );
  }

  return (
    <Calendar
      mode="single"
      className={cn("rounded-lg border", className)}
      locale={locale}
      onSelect={(day) => {
        if (day) {
          setSelectedEvents(eventsByDay.get(dateKeyLocal(day))?.events || []);
        }
      }}
      modifiers={{
        selected: highlightedDays,
      }}
    />
  );
}