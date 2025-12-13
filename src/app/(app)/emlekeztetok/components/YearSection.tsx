"use client"

import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { ReminderCard } from '@/app/(app)/emlekeztetok/components/ReminderCard'
import { Button } from '@/components/ui/button'
import {Reminder} from "@/payload-types";
import { useLanguage } from "@/components/common/LanguageProvider";

interface YearSectionProps {
    year: string
    reminders: Reminder[]
}

export function YearSection({ year, reminders }: YearSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const { lang } = useLanguage()

    const countLabel = lang === 'EN'
        ? `${reminders.length} ${reminders.length === 1 ? 'reminder' : 'reminders'}`
        : `${reminders.length} emlékeztető`

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-200">
                <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full justify-between p-6 h-auto hover:bg-red-100/60"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-[#862633]" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                            <p className="text-sm text-gray-600">
                                {countLabel}
                            </p>
                        </div>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </Button>
            </div>

            {isExpanded && (
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reminders.map((reminder) => (
                            <ReminderCard key={reminder.id} reminder={reminder} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
