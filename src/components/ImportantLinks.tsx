"use client"

import Link from "next/link"
import { useLanguage } from "./LanguageProvider"
import React from "react"

type Props = {
  className?: string
}

export default function ImportantLinks({ className }: Props) {
  const { lang } = useLanguage()
  const title = lang === "EN" ? "Important links:" : "Fontos linkek:"

  return (
    <div className={"bg-white rounded-lg shadow-md flex flex-col relative p-4 flex-1 " + (className ?? "") }>
      {title}
      <ul className="list-disc list-inside">
        <li>
          <Link href="https://neptun.bme.hu" target="_blank">
            Neptun
          </Link>
        </li>
        <li>
          <Link href="https://mueper.bme.hu" target="_blank">
            Műeper
          </Link>
        </li>
        <li>
          <Link href="https://kefir.bme.hu" target="_blank">
            Kefír
          </Link>
        </li>
      </ul>
    </div>
  )
}

