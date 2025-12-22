"use client"

import { YearSection } from '@/app/(app)/[lang]/emlekeztetok/components/YearSection';
import { EmptyState } from "@/components/common/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslate } from "@/hooks/useTranslate";
import { Reminder } from "@/payload-types";

interface RemindersGridClientProps {
    remindersByYear: Record<string, Reminder[]>
}

export default function RemindersGridClient({ remindersByYear }: RemindersGridClientProps) {
    const { t } = useTranslate()

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



    return (
        <Tabs defaultValue="ehk" className="w-full">
            <TabsList className="inline-flex w-auto mb-8 bg-gray-100 border border-gray-200">
                <TabsTrigger
                    value="ehk"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:bg-[#862633] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-[#862633] transition-colors"
                >
                    {t('reminders.tab_ehk', 'EHK Reminders')}
                </TabsTrigger>
                <TabsTrigger
                    value="ehdk"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:bg-[#862633] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-[#862633] transition-colors"
                >
                    {t('reminders.tab_ehdk', 'EHDK Reminders')}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="ehk">
                {ehkYears.length === 0 ? (
                    <EmptyState
                        title={t('reminders.no_ehk', `No EHK reminders`)}
                        description={t('reminders.no_ehk_desc', `There are currently no available EHK reminders.`)}
                    />
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
                    <EmptyState
                        title={t('reminders.no_ehdk', `No EHDK reminders`)}
                        description={t('reminders.no_ehdk_desc', `There are currently no available EHDK reminders.`)}
                    />
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
