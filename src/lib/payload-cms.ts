import 'server-only';
import {Decision, News, Reminder, Representative, Event } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getNews() {
  const payload = await getPayload({ config });
  const groups = await payload.find({
    collection: "news",
    limit: 1000,
    sort: "-date",
  });

  return groups.docs as News[];
}

export async function getEvents(): Promise<Event[]> {
  const payload = await getPayload({ config });
  const events = await payload.find({
    collection: "events",
    limit: 1000,
    sort: "date.startDate",
  });

  return events.docs as Event[];
}

export async function getRepresentatives() {
  const payload = await getPayload({ config });
  const representatives = await payload.find({
    collection: "representatives",
    depth: 1,
    limit: 1000,
    sort: "order",
  });

  return representatives.docs as Representative[];
}

export async function getReminders() {
  const payload = await getPayload({ config });
  const reminders = await payload.find({
    collection: "reminders",
    limit: 1000,
    sort: "-date",
  });

  return reminders.docs as Reminder[];
}

export async function getDecisions() {
  const payload = await getPayload({ config });
  const decisions = await payload.find({
    collection: "decisions",
    limit: 1000,
  });

  return decisions.docs as Decision[];
}