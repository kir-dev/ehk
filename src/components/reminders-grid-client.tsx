"use client"

import { YearSection } from '@/components/year-section'
import { FileText } from "lucide-react";

interface RemindersGridClientProps {
    remindersByYear: Record<string, any[]>
}

export default function RemindersGridClient({ remindersByYear }: RemindersGridClientProps) {
    const years = Object.keys(remindersByYear).sort((a, b) => parseInt(b) - parseInt(a))

    if (years.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nincsenek emlékeztetők</h3>
                <p className="text-gray-600">Jelenleg nincsenek elérhető emlékeztetők.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {years.map((year) => (
                <YearSection
                    key={year}
                    year={year}
                    reminders={remindersByYear[year]}
                />
            ))}
        </div>
    )
}
