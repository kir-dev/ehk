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
