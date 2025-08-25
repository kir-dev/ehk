"use client"

import Link from "next/link"
import { useLanguage } from "./LanguageProvider"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, ExternalLink } from "lucide-react"

type Props = {
  className?: string
}

export default function ImportantLinks({ className }: Props) {
  const { lang } = useLanguage()
  const t = {
    title: lang === "EN" ? "Important links" : "Fontos linkek",
  } as const

  const items = [
    { label: "Neptun", href: "https://neptun.bme.hu" },
    { label: "MŰEPER", href: "https://mueper.bme.hu" },
    { label: "KEFIR", href: "https://kefir.bme.hu" },
  ] as const

  return (
    <Card className={"overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow " + (className ?? "") }>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-50">
            <Link2 className="w-4 h-4 text-[#862633]" />
          </span>
          <span className="text-gray-900">{t.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="divide-y divide-gray-100">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-2.5 px-2 rounded-md hover:bg-red-50/60 transition-colors"
              >
                <span className="text-sm text-gray-700 group-hover:text-[#862633] transition-colors font-medium">
                  {it.label}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#862633] transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
