import { CalendarDays, MapPin } from "lucide-react";

import { parseFormattedText } from "@/utils/parseFormattedText";

import type { OrganizationEvent } from "../types";
import { Section } from "./Section";

function EventCard({ event }: Readonly<{ event: OrganizationEvent }>) {
  return (
    <div className="h-full rounded-2xl border border-border bg-[#f9f4f0] px-6 py-4 transition-colors hover:border-ehk-light-red/40 hover:bg-white">
      <h4 className="font-playfair text-base font-semibold leading-[1.4] text-black">
        {event.title}
      </h4>
      {event.description && (
        <p className="mt-2 font-open-sans text-xs leading-[1.5] text-black">
          {parseFormattedText(event.description)}
        </p>
      )}
      {(event.date || event.location) && (
        <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:flex-wrap">
          {event.date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {event.date}
            </span>
          )}
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function EventsSection({
  title,
  events,
}: Readonly<{
  title: string;
  events?: readonly OrganizationEvent[];
}>) {
  if (!events?.length) {
    return null;
  }

  return (
    <Section title={title}>
      <div className="flex flex-wrap gap-4">
        {events.map((event) =>
          event.href ? (
            <a
              key={`${event.title}-${event.href}`}
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full max-w-full"
            >
              <EventCard event={event} />
            </a>
          ) : (
            <div key={event.title} className="max-w-full">
              <EventCard event={event} />
            </div>
          ),
        )}
      </div>
    </Section>
  );
}
