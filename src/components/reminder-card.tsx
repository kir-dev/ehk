import { Eye, FileText, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {Reminder} from "@/payload-types";

interface ReminderCardProps {
    reminder: Reminder
}

export function ReminderCard({ reminder }: ReminderCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getFileExtension = (filename: string) => {
        return filename.split('.').pop()?.toLowerCase() || 'file'
    }

    const getFileIcon = (extension: string) => {
        const iconClass = "h-8 w-8"

        switch (extension) {
            case 'pdf':
                return <FileText className={`${iconClass} text-red-500`} />
            case 'doc':
            case 'docx':
                return <FileText className={`${iconClass} text-blue-500`} />
            case 'xls':
            case 'xlsx':
                return <FileText className={`${iconClass} text-green-500`} />
            case 'ppt':
            case 'pptx':
                return <FileText className={`${iconClass} text-orange-500`} />
            default:
                return <FileText className={`${iconClass} text-gray-500`} />
        }
    }

    const extension = typeof reminder.file === 'object' && reminder.file.filename
        ? getFileExtension(reminder.file.filename)
        : 'file'

    const fileUrl = typeof reminder.file === 'object' ? reminder.file.url : undefined

    const handleViewFile = () => {
        if (fileUrl) {
            window.open(fileUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                        {getFileIcon(extension)}
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
                                Megtekintés
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
