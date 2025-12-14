"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { NAVBAR_STYLES, getNavbarI18n } from "./navbar.constants"

interface SearchButtonProps {
  lang: 'EN' | 'HU'
}

export function SearchButton({ lang }: SearchButtonProps) {
  const i18n = getNavbarI18n(lang)
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={NAVBAR_STYLES.actions.searchButton}
    >
      <Search className="h-5 w-5" />
      <span className="sr-only">{i18n.search}</span>
    </Button>
  )
}
