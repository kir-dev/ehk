"use client"

import FileCard from "@/components/common/FileCard";
import { Reminder } from "@/payload-types";

interface ReminderCardProps {
    reminder: Reminder
}

export function ReminderCard({ reminder }: ReminderCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${month}.${day}`
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="font-open-sans font-semibold text-[11px] text-[#9a9a9a]">{formatDate(reminder.date)}</span>
            <FileCard
                file={reminder.file}
                title={reminder.displayText}
                actionType="view"
            />
        </div>
    )
}
