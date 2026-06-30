"use client"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu"
import { useRef, useState } from "react"
import { DesktopMenuItem } from "./DesktopMenuItem"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface DesktopNavigationProps {
  items: NavigationItem[]
  onNavigate: (href: string) => void
}

export function DesktopNavigation({ items, onNavigate }: DesktopNavigationProps) {
  const [activeValue, setActiveValue] = useState<string>("")
  const [clickLockedValue, setClickLockedValue] = useState<string>("")
  const clickLockedRef = useRef<string>("")

  const handleValueChange = (value: string) => {
    if (clickLockedRef.current) {
      // While pinned, ignore all Radix hover changes — keep showing the pinned item
      setActiveValue(clickLockedRef.current)
      return
    }
    setActiveValue(value)
  }

  const handleTriggerClick = (title: string) => {
    if (clickLockedRef.current === title) {
      // Toggle off the pinned item
      clickLockedRef.current = ""
      setClickLockedValue("")
      setActiveValue("")
    } else {
      // Pin this item
      clickLockedRef.current = title
      setClickLockedValue(title)
      setActiveValue(title)
    }
  }

  const handleNavigate = (href: string) => {
    clickLockedRef.current = ""
    setClickLockedValue("")
    setActiveValue("")
    onNavigate(href)
  }

  const handleClose = () => {
    clickLockedRef.current = ""
    setClickLockedValue("")
    setActiveValue("")
  }

  return (
    <>
      <NavigationMenu
        value={activeValue}
        onValueChange={handleValueChange}
        className={`${NAVBAR_STYLES.desktop.nav} !static`}
        viewport={false}
      >
        <NavigationMenuList>
          {items.map((item) => (
            <DesktopMenuItem
              key={item.title}
              item={item}
              onNavigate={handleNavigate}
              onTriggerClick={handleTriggerClick}
              isClickLocked={clickLockedValue === item.title}
            />
          ))}
        </NavigationMenuList>
        <NavigationMenuViewport className={NAVBAR_STYLES.desktop.menuViewport} />
      </NavigationMenu>

      {/* Backdrop overlay */}
      {activeValue && (
        <div
          className="fixed inset-0 top-20 bg-black/40 backdrop-blur-[2px] z-90 animate-in fade-in duration-200"
          onClick={handleClose}
        />
      )}
    </>
  )
}
