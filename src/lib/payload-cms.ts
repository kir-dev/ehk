import { News, Event } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getNews(){
  const payload = await getPayload({ config });
  const groups = await payload.find({
    collection: "news",
    limit: 1000,
    sort: "order",
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
