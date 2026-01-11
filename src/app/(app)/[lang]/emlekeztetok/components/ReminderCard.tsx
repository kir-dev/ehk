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
        <FileCard
            file={reminder.file}
            title={reminder.displayText}
            date={formatDate(reminder.date)}
            actionType="view"
        />
    )
}
