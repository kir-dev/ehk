"use client"

import { getNavigationItems } from "@/app/(app)/components/navigation-items"
import { useLanguage } from "@/components/common/LanguageProvider"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import type { NavbarLogicReturn } from "./navbar.types"

export function useNavbarLogic(): NavbarLogicReturn {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  
  const navigationItems = useMemo(
    () => getNavigationItems(lang),
    [lang]
  )
  
  const handleLangToggle = useCallback(() => {
    const newLang = lang === 'EN' ? 'hu' : 'en'
    const segments = pathname.split('/')
    
    if (segments.length > 1 && (segments[1] === 'hu' || segments[1] === 'en')) {
      segments[1] = newLang
      router.push(segments.join('/'))
    } else {
      router.push(`/${newLang}${pathname}`)
    }
    
    toggleLang()
  }, [lang, pathname, router, toggleLang])
  
  const handleNavigate = useCallback((href: string) => {
    router.push(href)
  }, [router])
  
  return {
    lang,
    navigationItems,
    handleLangToggle,
    handleNavigate,
    mobileMenuOpen,
    setMobileMenuOpen
  }
}
