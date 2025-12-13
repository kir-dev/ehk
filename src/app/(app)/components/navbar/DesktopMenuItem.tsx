"use client"

import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface DesktopMenuItemProps {
  item: NavigationItem
  onNavigate: (href: string) => void
}

export function DesktopMenuItem({ item, onNavigate }: DesktopMenuItemProps) {
  const hasSubItems = item.items.length > 0
  
  if (hasSubItems) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={NAVBAR_STYLES.desktop.menuTrigger}
          onClick={() => {
            if (item.href) onNavigate(item.href)
          }}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className={NAVBAR_STYLES.desktop.menuContent}>
          <div className={NAVBAR_STYLES.desktop.menuContentInner}>
            <div className="grid gap-2">
              {item.items.map((subItem) => (
                <NavigationMenuLink key={subItem.label} asChild>
                  <Link
                    href={subItem.href}
                    target={subItem.targetBlank ? "_blank" : undefined}
                    rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                    className={NAVBAR_STYLES.desktop.subMenuItem}
                  >
                    {subItem.label}
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }
  
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.href}
          target={item.targetBlank ? "_blank" : undefined}
          rel={item.targetBlank ? "noopener noreferrer" : undefined}
          className={NAVBAR_STYLES.desktop.menuLink}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
