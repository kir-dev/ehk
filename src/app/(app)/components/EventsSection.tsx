import React from "react"
import { Event } from "@/payload-types"
import EventsListClient from "./events"

type Props = {
  lang: "hu" | "en"
  events: Event[]
  dictionary: Record<string, Record<string, string>>
}

export default function EventsSection({ lang, events, dictionary }: Readonly<Props>) {
  return (
    <EventsListClient
      lang={lang}
      events={events}
      dictionary={dictionary}
    />
  )
}
