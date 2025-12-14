"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { MobileMenuItem } from "./MobileMenuItem"
import { NAVBAR_STYLES, getNavbarI18n } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface MobileNavigationProps {
  items: NavigationItem[]
  lang: 'EN' | 'HU'
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNavigation({ items, lang, isOpen, onOpenChange }: MobileNavigationProps) {
  const i18n = getNavbarI18n(lang)
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={NAVBAR_STYLES.mobile.trigger}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{i18n.openMenu}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={NAVBAR_STYLES.mobile.sheet}>
        <div className={NAVBAR_STYLES.mobile.container}>
          <SheetHeader className={NAVBAR_STYLES.mobile.header}>
            <SheetTitle className="text-base font-medium">
              {i18n.mobileMenuTitle}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <nav className={NAVBAR_STYLES.mobile.nav}>
              {items.map((item) => (
                <MobileMenuItem
                  key={item.title}
                  item={item}
                  onNavigate={() => onOpenChange(false)}
                />
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
