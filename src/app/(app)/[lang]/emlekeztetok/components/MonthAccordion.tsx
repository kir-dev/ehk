"use client"

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { ReminderCard } from '@/app/(app)/[lang]/emlekeztetok/components/ReminderCard'
import { cn } from '@/lib/utils'
import { Reminder } from "@/payload-types"

interface MonthAccordionProps {
    monthName: string
    reminders: Reminder[]
}

export function MonthAccordion({ monthName, reminders }: MonthAccordionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="rounded-2xl border border-[#e9e2d6] bg-[#fffefc] overflow-hidden">
            <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="flex w-full items-center gap-8 px-6 py-4 md:px-8 text-left transition-colors duration-200 hover:bg-[#f9f4f0] cursor-pointer"
            >
                <div className="flex flex-1 items-center gap-2 min-w-0">
                    <span className="font-open-sans font-bold text-base text-[#1a1a1a]">
                        {monthName}
                    </span>
                    <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#e8e4e0]/60 px-1.5 py-0.5 font-open-sans text-[11px] font-semibold text-[#1a1a1a] leading-none">
                        {reminders.length}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 text-[#1a1a1a] transition-transform duration-300",
                        isExpanded && "rotate-180",
                    )}
                />
            </button>

            <div
                className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 px-6 pb-6 md:px-8">
                        {reminders.map((reminder) => (
                            <ReminderCard key={reminder.id} reminder={reminder} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
