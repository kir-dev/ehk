"use client"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu"
import { useState } from "react"
import { DesktopMenuItem } from "./DesktopMenuItem"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface DesktopNavigationProps {
  items: NavigationItem[]
  onNavigate: (href: string) => void
}

export function DesktopNavigation({ items, onNavigate }: DesktopNavigationProps) {
  const [activeValue, setActiveValue] = useState<string>("")

  return (
    <>
      <NavigationMenu 
        value={activeValue} 
        onValueChange={setActiveValue}
        className={`${NAVBAR_STYLES.desktop.nav} !static`}
        viewport={false}
      >
        <NavigationMenuList>
          {items.map((item) => (
            <DesktopMenuItem 
              key={item.title} 
              item={item} 
              onNavigate={onNavigate} 
            />
          ))}
        </NavigationMenuList>
        <NavigationMenuViewport className={NAVBAR_STYLES.desktop.menuViewport} />
      </NavigationMenu>

      {/* Backdrop overlay */}
      {activeValue && (
        <div 
          className="fixed inset-0 top-20 bg-black/40 backdrop-blur-[2px] z-[90] animate-in fade-in duration-200"
          onClick={() => setActiveValue("")}
        />
      )}
    </>
  )
}
