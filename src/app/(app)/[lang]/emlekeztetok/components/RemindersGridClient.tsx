"use client"

import { MonthAccordion } from '@/app/(app)/[lang]/emlekeztetok/components/MonthAccordion'
import { EmptyState } from "@/components/common/EmptyState"
import { useLanguage } from "@/components/common/LanguageProvider"
import { useTranslate } from "@/hooks/useTranslate"
import { cn, groupRemindersByYearAndMonth, MONTH_NAMES } from '@/lib/utils'
import { Reminder } from "@/payload-types"
import { Fragment, useMemo, useState } from 'react'

interface RemindersGridClientProps {
    reminders: Reminder[]
}

const TYPES = ['EHK', 'EHDK'] as const
type ReminderType = (typeof TYPES)[number]

export default function RemindersGridClient({ reminders }: Readonly<RemindersGridClientProps>) {
    const { t } = useTranslate()
    const { lang } = useLanguage()
    const [activeType, setActiveType] = useState<ReminderType>('EHK')

    const monthNames = MONTH_NAMES[lang] ?? MONTH_NAMES.HU

    const yearGroups = useMemo(
        () => groupRemindersByYearAndMonth(reminders.filter((r) => r.type === activeType)),
        [reminders, activeType],
    )

    return (
        <div className="flex flex-col gap-4">
            {/* Capsule tab switcher (EHK / EHDK) */}
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-[#e8e4e0] bg-[#fffefc] p-1 shadow-sm">
                {TYPES.map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        aria-pressed={activeType === type}
                        className={cn(
                            "rounded-full px-4 py-2 font-open-sans text-sm select-none cursor-pointer transition-colors duration-200",
                            activeType === type
                                ? "bg-[#862633] font-bold text-white"
                                : "font-normal text-[#3d3d3d] hover:bg-[#e8e4e0]/30 hover:text-[#862633]",
                        )}
                    >
                        {t(`reminders.tab_${type.toLowerCase()}`)}
                    </button>
                ))}
            </div>

            {yearGroups.length === 0 ? (
                <EmptyState
                    title={t(activeType === 'EHK' ? 'reminders.no_ehk' : 'reminders.no_ehdk')}
                    description={t(activeType === 'EHK' ? 'reminders.no_ehk_desc' : 'reminders.no_ehdk_desc')}
                />
            ) : (
                <>
                    {/* Divider */}
                    <div className="h-px w-full bg-[#e9e2d6]" />

                    {yearGroups.map((yearGroup) => (
                        <Fragment key={yearGroup.year}>
                            <p className="font-open-sans font-bold text-sm text-[#9a9a9a]">
                                {yearGroup.year}
                            </p>
                            {yearGroup.months.map((monthGroup) => (
                                <MonthAccordion
                                    key={monthGroup.month}
                                    monthName={monthNames[monthGroup.month]}
                                    reminders={monthGroup.reminders}
                                />
                            ))}
                        </Fragment>
                    ))}
                </>
            )}
        </div>
    )
}
