"use client"

import FileCard from "@/components/common/FileCard";
import { useLanguage } from "@/components/common/LanguageProvider";
import { Reminder } from "@/payload-types";

interface ReminderCardProps {
    reminder: Reminder
}

export function ReminderCard({ reminder }: ReminderCardProps) {
    const { lang } = useLanguage()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const locale = lang === 'EN' ? 'en-US' : 'hu-HU'
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-500">{formatDate(reminder.date)}</span>
            <FileCard
                file={reminder.file}
                title={reminder.displayText}
                actionType="view"
            />
        </div>
    )
}
