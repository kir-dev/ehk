"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

export default function BackNav() {
  const { lang } = useLanguage()
  const label = lang === 'EN' ? 'Back to news' : 'Vissza a hírekhez'
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

