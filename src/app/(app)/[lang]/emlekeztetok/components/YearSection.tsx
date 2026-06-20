"use client"

import { Calendar } from 'lucide-react'
import { ReminderCard } from '@/app/(app)/[lang]/emlekeztetok/components/ReminderCard'
import { AccordionItem } from '@/components/common/Accordion'
import { Reminder } from "@/payload-types";
import { useLanguage } from "@/components/common/LanguageProvider";

interface YearSectionProps {
    year: string
    reminders: Reminder[]
}

export function YearSection({ year, reminders }: YearSectionProps) {
    const { lang } = useLanguage()

    const countLabel = lang === 'EN'
        ? `${reminders.length} ${reminders.length === 1 ? 'reminder' : 'reminders'}`
        : `${reminders.length} emlékeztető`

    return (
        <AccordionItem
            headingLevel={2}
            title={
                <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f9f4f0] transition-colors group-hover:bg-[#f4e8e7] motion-reduce:transition-none">
                        <Calendar className="h-5 w-5 text-[#862633]" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                        <span className="text-xl font-bold leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#862633] md:text-2xl motion-reduce:transition-none">
                            {year}
                        </span>
                        <span className="mt-1 text-sm font-normal leading-normal text-[#6e6660]">
                            {countLabel}
                        </span>
                    </span>
                </span>
            }
            buttonClassName="px-4 py-4 md:px-6 md:py-5"
            headerClassName="font-normal"
            contentClassName="px-4 pb-4 md:px-6 md:pb-6"
            className="bg-white"
        >
            <div className="flex flex-col gap-4">
                {reminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
            </div>
        </AccordionItem>
    )
}
