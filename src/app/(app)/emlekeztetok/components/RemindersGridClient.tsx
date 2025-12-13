"use client"

import { FileText } from 'lucide-react'
import { YearSection } from '@/app/(app)/emlekeztetok/components/YearSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Reminder } from "@/payload-types";
import { useLanguage } from "@/components/common/LanguageProvider";

interface RemindersGridClientProps {
    remindersByYear: Record<string, Reminder[]>
}

export default function RemindersGridClient({ remindersByYear }: RemindersGridClientProps) {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    // Filter reminders by type
    const filterRemindersByType = (type: 'EHK' | 'EHDK') => {
        const filtered: Record<string, Reminder[]> = {}
        Object.keys(remindersByYear).forEach(year => {
            const remindersOfType = remindersByYear[year].filter(reminder => reminder.type === type)
            if (remindersOfType.length > 0) {
                filtered[year] = remindersOfType
            }
        })
        return filtered
    }

    const ehkRemindersByYear = filterRemindersByType('EHK')
    const ehdkRemindersByYear = filterRemindersByType('EHDK')

    const ehkYears = Object.keys(ehkRemindersByYear).sort((a, b) => parseInt(b) - parseInt(a))
    const ehdkYears = Object.keys(ehdkRemindersByYear).sort((a, b) => parseInt(b) - parseInt(a))

    const EmptyState = ({ type }: { type: string }) => (
        <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`Nincsenek ${type} emlékeztetők`, `No ${type} reminders`)}</h3>
            <p className="text-gray-600">{t(`Jelenleg nincsenek elérhető ${type} emlékeztetők.`, `There are currently no available ${type} reminders.`)}</p>
        </div>
    )

    return (
        <Tabs defaultValue="ehk" className="w-full">
            <TabsList className="inline-flex w-auto mb-8 bg-gray-100 border border-gray-200">
                <TabsTrigger
                    value="ehk"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:bg-[#862633] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-[#862633] transition-colors"
                >
                    {t('EHK Emlékeztetők', 'EHK Reminders')}
                </TabsTrigger>
                <TabsTrigger
                    value="ehdk"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:bg-[#862633] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-[#862633] transition-colors"
                >
                    {t('EHDK Emlékeztetők', 'EHDK Reminders')}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="ehk">
                {ehkYears.length === 0 ? (
                    <EmptyState type="EHK" />
                ) : (
                    <div className="space-y-8">
                        {ehkYears.map((year) => (
                            <YearSection
                                key={year}
                                year={year}
                                reminders={ehkRemindersByYear[year]}
                            />
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="ehdk">
                {ehdkYears.length === 0 ? (
                    <EmptyState type="EHDK" />
                ) : (
                    <div className="space-y-8">
                        {ehdkYears.map((year) => (
                            <YearSection
                                key={year}
                                year={year}
                                reminders={ehdkRemindersByYear[year]}
                            />
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}
