import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Reminder} from "@/payload-types";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderFormattedText(
  text: string, 
  boldClassName: string = "text-gray-900", 
  italicClassName: string = "text-gray-400 block mt-2 text-xs"
) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return React.createElement('strong', { key: index, className: boldClassName }, part.slice(2, -2));
    } else if (part.startsWith('*') && part.endsWith('*')) {
      return React.createElement('em', { key: index, className: italicClassName }, part.slice(1, -1));
    }
    return React.createElement(React.Fragment, { key: index }, part);
  });
}

// Localized month names, indexed 0 (January) - 11 (December)
export const MONTH_NAMES: Record<'HU' | 'EN', string[]> = {
  HU: [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
  ],
  EN: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
}

export interface ReminderMonthGroup {
  month: number // 0-11
  reminders: Reminder[]
}

export interface ReminderYearGroup {
  year: number
  months: ReminderMonthGroup[]
}

/**
 * Groups reminders into a Year > Month > Items hierarchy.
 * Years and months are sorted newest-first, as are the reminders within each month.
 */
export function groupRemindersByYearAndMonth(reminders: Reminder[]): ReminderYearGroup[] {
  const byYear = new Map<number, Map<number, Reminder[]>>()

  for (const reminder of reminders) {
    const date = new Date(reminder.date)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (!byYear.has(year)) {
      byYear.set(year, new Map())
    }
    const months = byYear.get(year)!
    if (!months.has(month)) {
      months.set(month, [])
    }
    months.get(month)!.push(reminder)
  }

  return Array.from(byYear.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, months]) => ({
      year,
      months: Array.from(months.entries())
        .sort(([a], [b]) => b - a)
        .map(([month, items]) => ({
          month,
          reminders: items.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        })),
    }))
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
  'International': 'International',
}

export function translateTag(tag: string, lang: 'HU' | 'EN'): string {
  if (lang === 'EN') return TAG_TRANSLATIONS[tag] ?? tag
  return tag
}

export function translateTags(tags: string[] = [], lang: 'HU' | 'EN'): string[] {
  return tags.map((t) => translateTag(t, lang))
}

// Map known tags to their section routes (HU paths), with EN variant for International
export function getTagRoute(tag: string, lang: 'HU' | 'EN'): string | null {
  switch (tag) {
    case 'EHK':
      return '/szervezet/hirek'
    case 'Oktatás':
      return '/oktatas/hirek'
    case 'Juttatás':
      return '/juttatas/hirek'
    case 'Kollégium':
      return '/kollegium/hirek'
    case 'Sport':
      return '/sport/hirek'
    case 'Külügy':
      return lang === 'EN' ? '/international/hirek' : '/kulugy/hirek'
    case 'Közélet':
      return '/kozelet/hirek'
    case 'Tájékoztatás':
      return '/golyaknak/hirek'
    case 'International':
      return '/international/hirek'
    default:
      return null
  }
}

export function formatDate(dateString: string, lang: 'HU' | 'EN'): string {
  const d = new Date(dateString)
  if (lang === 'EN') {
    return d.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  }
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}. ${m}. ${day}`
}
