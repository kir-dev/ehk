"use client"

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { ChevronDownIcon, ExternalLink } from "lucide-react"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface DesktopMenuItemProps {
  item: NavigationItem
  onNavigate: (href: string) => void
}

export function DesktopMenuItem({ item, onNavigate }: Readonly<DesktopMenuItemProps>) {
  const hasSubItems = item.items.length > 0
  
  if (hasSubItems) {
    return (
      <NavigationMenuPrimitive.Item value={item.title}>
        <NavigationMenuPrimitive.Trigger
          className={NAVBAR_STYLES.desktop.menuTrigger}
        >
          {item.title}
          <ChevronDownIcon
            className="relative top-px ml-1 size-3.5 transition duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </NavigationMenuPrimitive.Trigger>
        <NavigationMenuPrimitive.Content className={NAVBAR_STYLES.desktop.menuContent}>
          <div className={NAVBAR_STYLES.desktop.menuContentInner}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {item.items.map((subItem) => (
                <NavigationMenuPrimitive.Link key={subItem.label} asChild>
                  <Link
                    href={subItem.href}
                    target={subItem.targetBlank ? "_blank" : undefined}
                    rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                    className={NAVBAR_STYLES.desktop.subMenuItem}
                    onClick={() => onNavigate(subItem.href)}
                  >
                    <span className="text-sm font-bold text-neutral-900 mb-1 flex items-center gap-1.5 group-hover:text-[#862633] transition-colors duration-200">
                      {subItem.label}
                      {subItem.targetBlank && (
                        <ExternalLink className="size-3.5 text-neutral-400 group-hover:text-[#862633] transition-colors shrink-0" />
                      )}
                    </span>
                    {subItem.subtitle && (
                      <span className="text-xs text-[#6e6660] leading-relaxed font-normal group-hover:text-[#6e6660]/85 transition-colors duration-200">
                        {subItem.subtitle}
                      </span>
                    )}
                  </Link>
                </NavigationMenuPrimitive.Link>
              ))}
            </div>
          </div>
        </NavigationMenuPrimitive.Content>
      </NavigationMenuPrimitive.Item>
    )
  }
  
  return (
    <NavigationMenuPrimitive.Item value={item.title}>
      <NavigationMenuPrimitive.Link asChild>
        <Link
          href={item.href}
          target={item.targetBlank ? "_blank" : undefined}
          rel={item.targetBlank ? "noopener noreferrer" : undefined}
          className={NAVBAR_STYLES.desktop.menuLink}
          onClick={() => onNavigate(item.href)}
        >
          {item.title}
        </Link>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}
