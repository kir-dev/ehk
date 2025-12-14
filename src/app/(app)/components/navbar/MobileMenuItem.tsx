"use client"

import Link from "next/link"
import { NAVBAR_STYLES } from "./navbar.constants"
import type { NavigationItem } from "./navbar.types"

interface MobileMenuItemProps {
  item: NavigationItem
  onNavigate: () => void
}

export function MobileMenuItem({ item, onNavigate }: MobileMenuItemProps) {
  return (
    <div className="space-y-2">
      <Link
        href={item.href}
        className={NAVBAR_STYLES.mobile.menuItem}
        onClick={onNavigate}
      >
        {item.title}
      </Link>
      {item.items.length > 0 && (
        <div className={NAVBAR_STYLES.mobile.subItemsContainer}>
          {item.items.map((subItem) => (
            <Link
              key={subItem.label}
              href={subItem.href}
              target={subItem.targetBlank ? "_blank" : undefined}
              rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
              className={NAVBAR_STYLES.mobile.subMenuItem}
              onClick={onNavigate}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
