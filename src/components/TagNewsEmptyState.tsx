"use client"

import { FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/LanguageProvider"

export default function TagNewsEmptyState() {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Nincsenek találatok', 'No results')}</h3>
        <p className="text-gray-600">{t('Ebben a kategóriában még nincsenek hírek.', 'There are no news items in this category yet.')}</p>
      </CardContent>
    </Card>
  )
}

