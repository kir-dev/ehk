"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useTranslate } from "@/hooks/useTranslate"
import { FileText } from "lucide-react"

export default function TagNewsEmptyState() {
  const { t } = useTranslate()

  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('news.no_results')}</h3>
        <p className="text-gray-600">{t('news.no_news_category')}</p>
      </CardContent>
    </Card>
  )
}

