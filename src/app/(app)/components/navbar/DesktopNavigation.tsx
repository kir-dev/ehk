"use client"

import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import { DesktopMenuItem } from "./DesktopMenuItem"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface DesktopNavigationProps {
  items: NavigationItem[]
  onNavigate: (href: string) => void
}

export function DesktopNavigation({ items, onNavigate }: DesktopNavigationProps) {
  return (
    <NavigationMenu className={NAVBAR_STYLES.desktop.nav} viewport={false}>
      <NavigationMenuList>
        {items.map((item) => (
          <DesktopMenuItem 
            key={item.title} 
            item={item} 
            onNavigate={onNavigate} 
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
