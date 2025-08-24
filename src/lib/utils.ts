import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Reminder} from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupRemindersByYear(reminders: Reminder[]): Record<string, Reminder[]> {
  return reminders.reduce((acc, reminder) => {
    const year = new Date(reminder.date).getFullYear().toString()

    if (!acc[year]) {
      acc[year] = []
    }

    acc[year].push(reminder)

    // Sort reminders within each year by date (newest first)
    acc[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return acc
  }, {} as Record<string, Reminder[]>)
}

// Tag translation mapping HU -> EN
export const TAG_TRANSLATIONS: Record<string, string> = {
  'EHK': 'EHK',
  'Oktatás': 'Education',
  'Juttatás': 'Grants',
  'Kollégium': 'Dormitory',
  'Pályázat': 'Application',
  'Sport': 'Sports',
  'Külügy': 'International Affairs',
  'Rendezvények': 'Events',
  'Közélet': 'Community Life',
  'Felhívás': 'Announcement',
  'Beszámoló': 'Report',
  'Tájékoztatás': 'Information',
  'Kiemelt hír': 'Featured',
}

export function translateTag(tag: string, lang: 'HU' | 'EN'): string {
  if (lang === 'EN') return TAG_TRANSLATIONS[tag] ?? tag
  return tag
}

export function translateTags(tags: string[] = [], lang: 'HU' | 'EN'): string[] {
  return tags.map((t) => translateTag(t, lang))
}
