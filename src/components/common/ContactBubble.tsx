"use client"

import { useTranslate } from '@/hooks/useTranslate'
import { Mail } from 'lucide-react'

export const ContactBubble = () => {
  const { t } = useTranslate()

  return (
    <a
      href="mailto:info@bmeehk.hu"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#862633] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#6b1e28] transition-all hover:scale-105 group"
      aria-label={t('common.contact_aria_label')}
    >
      <div className="relative">
        <Mail className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#862633] rounded-full animate-pulse"></span>
      </div>
      <span className="font-medium">{t('common.questions')}</span>
    </a>
  )
}
