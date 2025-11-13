import {
  Decision,
  Event,
  Help,
  News,
  Permission,
  Regulation,
  Reminder,
  Representative,
} from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

export async function getNews(options?: {
  page?: number;
  limit?: number;
  tag?: string;
}) {
  const payload = await getPayload({ config });
  const where = options?.tag
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ tags: { contains: options.tag } } as any)
    : undefined;
  const result = await payload.find({
    collection: "news",
    sort: "-date",
    page: options?.page ?? 1,
    limit: options?.limit ?? 6,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
  });

  return {
    docs: result.docs as News[],
    totalDocs: result.totalDocs ?? result.docs.length,
    totalPages: result.totalPages ?? 1,
    page: result.page ?? 1,
    limit: result.limit ?? options?.limit ?? 6,
  };
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

export async function getPermissions() {
  const payload = await getPayload({ config });
  const permissions = await payload.find({
    collection: "permissions",
    limit: 1000,
    sort: "name_hu",
    depth: 1,
  });
  return permissions.docs as Permission[];
}

export async function getAcademicRegulations() {
  const payload = await getPayload({ config });
  const regulations = await payload.find({
    collection: "regulations",
    limit: 1000,
    sort: "name_hu",
    depth: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { type: { equals: "academic" } } as any,
  });
  return regulations.docs as Regulation[];
}

export async function getBenefitRegulations() {
  const payload = await getPayload({ config });
  const regulations = await payload.find({
    collection: "regulations",
    limit: 1000,
    sort: "name_hu",
    depth: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { type: { equals: "benefits" } } as any,
  });
  return regulations.docs as Regulation[];
}

export async function getDormitoryRegulations() {
  const payload = await getPayload({ config });
  const regulations = await payload.find({
    collection: "regulations",
    limit: 1000,
    sort: "name_hu",
    depth: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { type: { equals: "dormitory" } } as any,
  });
  return regulations.docs as Regulation[];
}

export async function getNewsById(id: number) {
  const payload = await getPayload({ config });
  const news = await payload.find({
    collection: "news",
    depth: 2,
    limit: 1,
    where: {
      id: {
        equals: id,
      },
    },
  });

  return news.docs[0] as News;
}

export async function getRelatedNews(
  id: number,
  tags: string[] = [],
  limit: number = 2
) {
  const payload = await getPayload({ config });

  if (!Array.isArray(tags) || tags.length === 0) {
    return [] as News[];
  }

  const baseFilter = { id: { not_equals: id } };
  const tagOr = { or: tags.map((tag) => ({ tags: { contains: tag } })) };
  const where = { and: [baseFilter, tagOr] };

  const news = await payload.find({
    collection: "news",
    limit,
    sort: "-date",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
  });

  return news.docs as News[];
}

export async function getHelp() {
  const payload = await getPayload({ config });
  const help = await payload.find({
    collection: "help",
    limit: 1000,
  });

  return help.docs as Help[];
}
