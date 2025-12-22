"use client"

import FileIcon from "@/components/common/FileIcon";
import { useLanguage } from "@/components/common/LanguageProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Reminder } from "@/payload-types";
import { getFileExtension } from "@/utils/file";
import { Calendar, Eye } from 'lucide-react';

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

    const extension = typeof reminder.file === 'object' && reminder.file.filename
        ? getFileExtension(reminder.file)
        : 'file'

    const fileUrl = typeof reminder.file === 'object' ? reminder.file.url : undefined

    const handleViewFile = () => {
        if (fileUrl) {
            window.open(fileUrl, '_blank', 'noopener,noreferrer')
        }
    }

    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                        <div className="h-8 w-8 flex items-center justify-center">
                            <FileIcon extension={extension} />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#862633] transition-colors">
                            {reminder.displayText}
                        </h3>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(reminder.date)}</span>
                        </div>

                        <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {extension}
              </span>

                            <Button
                                size="sm"
                                variant="outline"
                                className="group-hover:bg-red-50 group-hover:border-[#862633] group-hover:text-[#862633]"
                                onClick={handleViewFile}
                                disabled={!fileUrl}
                            >
                                <Eye className="h-4 w-4 mr-1" />
                                {t('Megtekintés', 'View')}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
