"use client"

import * as React from "react"
import { Button, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

type ShareButtonProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants> & {
    title: string
    text?: string
  }

type ShareNavigator = Navigator & { share?: (data: ShareData) => Promise<void> }

export default function ShareButton({ title, text, onClick, ...props }: ShareButtonProps) {
  const handleShare = async () => {
    const nav = navigator as ShareNavigator
    try {
      if (typeof window !== "undefined" && typeof nav.share === "function") {
        await nav.share({ title, text, url: window.location.href })
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
      }
    } catch {
      // ignore
    }
  }

  return <Button onClick={onClick ?? handleShare} {...props} />
}
