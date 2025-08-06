"use client";

import * as React from "react";
import { Event } from "@/payload-types";
import { useMemo, useState } from "react";
import { Calendar } from "./ui/calendar";
import { hu } from "react-day-picker/locale";
import EventCard from "./EventCard";
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

export default function EventCalendar({ events }: { events: Event[] }) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

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

  return (
    <div className="flex flex-row gap-4 p-4">
      <Calendar
        mode="single"
        className="rounded-lg border"
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
      <div className="flex flex-row gap-4 flex-1 items-stretch">
        {selectedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
