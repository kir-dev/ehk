"use client";

import * as React from "react";
import { Event } from "@/payload-types";
import { useMemo, useState } from "react";
import { Calendar } from "./ui/calendar";
import { hu } from "react-day-picker/locale";
import EventCard from "./EventCard";
import { cn } from "@/lib/utils";
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
        const prevEventDay = new Date(eventDay);
        prevEventDay.setDate(prevEventDay.getDate() - 1);
        const currentDayString = prevEventDay.toISOString().split("T")[0];
        const currentEvents = eventsByDay.get(currentDayString)?.events;
        if (currentEvents) {
          currentEvents.push(event);
        } else {
          eventsByDay.set(currentDayString, {
            date: eventDay,
            events: [event],
          });
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
      locale={hu}
      onSelect={(day) => {
        if (day) {
          setSelectedEvents(
            eventsByDay.get(day.toISOString().split("T")[0])?.events || []
          );
        }
      }}
      modifiers={{
        selected: highlightedDays,
      }}
    />
  );
}
