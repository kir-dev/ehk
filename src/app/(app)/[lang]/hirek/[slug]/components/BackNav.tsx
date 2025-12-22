"use client"

import { Button } from "@/components/ui/button"
import { useTranslate } from "@/hooks/useTranslate"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BackNav() {
  const { t } = useTranslate()
  const label = t('news.back_to_news')
  return (
    <div className="mb-6">
      <Button variant="ghost" asChild className="hover:bg-gray-100 hover:text-ehk-dark-red">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {label}
        </Link>
      </Button>
    </div>
  )
}

