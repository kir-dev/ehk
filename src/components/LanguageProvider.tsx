"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Lang = 'HU' | 'EN'

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

type Props = {
  defaultLang: Lang
  children: React.ReactNode
}

export function LanguageProvider({ defaultLang, children }: Props) {
  const [lang, setLangState] = useState<Lang>(defaultLang)

  // initialize from localStorage if present
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null
      if (saved === 'HU' || saved === 'EN') {
        setLangState(saved)
        document.documentElement.lang = saved.toLowerCase()
      } else {
        document.documentElement.lang = defaultLang.toLowerCase()
      }
    } catch {}
  }, [defaultLang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', next)
        // persist cookie for SSR/read on server
        document.cookie = `lang=${next.toLowerCase()}; path=/; max-age=${60 * 60 * 24 * 365}`
      }
      document.documentElement.lang = next.toLowerCase()
    } catch {}
  }

  const toggleLang = () => setLang(lang === 'HU' ? 'EN' : 'HU')

  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang, toggleLang])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
