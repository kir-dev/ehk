"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type Props = {
  activeTab: "news" | "events"
  newsCount: number
  eventsCount: number
  newsTitle: string
  eventsTitle: string
  onTabChange: (tab: "news" | "events") => void
}

export default function Switcher({
  activeTab,
  newsCount,
  eventsCount,
  newsTitle,
  eventsTitle,
  onTabChange,
}: Readonly<Props>) {
  const newsRef = useRef<HTMLButtonElement>(null)
  const eventsRef = useRef<HTMLButtonElement>(null)
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({
    left: 4,
    width: 0,
    opacity: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  // Measure and update sliding background position
  useEffect(() => {
    const updateSlider = () => {
      const activeRef = activeTab === "news" ? newsRef.current : eventsRef.current
      if (activeRef) {
        setSliderStyle({
          left: activeRef.offsetLeft,
          width: activeRef.offsetWidth,
          opacity: 1,
        })
      }
    }

    updateSlider()

    window.addEventListener("resize", updateSlider)
    return () => window.removeEventListener("resize", updateSlider)
  }, [activeTab])

  // Track mount state to trigger transitions only after the initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="bg-[#fffefc] border border-[#e8e4e0] flex relative items-center p-1 rounded-full w-fit shadow-sm"
      data-name="Switcher"
    >
      {/* Sliding active tab indicator */}
      <div
        className={cn(
          "absolute bg-[#862633] rounded-full h-[calc(100%-8px)] top-1",
          isMounted ? "transition-all duration-300 ease-in-out" : "transition-none"
        )}
        style={sliderStyle}
      />

      {/* News Tab */}
      <button
        ref={newsRef}
        type="button"
        onClick={() => onTabChange("news")}
        className={cn(
          "flex gap-2.5 items-center justify-center px-4 py-2 rounded-full font-open-sans relative z-10 select-none cursor-pointer",
          activeTab === "news"
            ? "text-white font-bold"
            : "text-[#3d3d3d] hover:bg-[#e8e4e0]/30 hover:text-[#3d3d3d]/90 font-normal transition-colors duration-200"
        )}
      >
        <span className="text-sm">{newsTitle}</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold min-w-5 text-center leading-none flex items-center justify-center transition-colors duration-300",
            activeTab === "news"
              ? "bg-white/20 text-white"
              : "bg-[#e8e4e0]/60 text-[#3d3d3d]"
          )}
        >
          {newsCount}
        </span>
      </button>

      {/* Events Tab */}
      <button
        ref={eventsRef}
        type="button"
        onClick={() => onTabChange("events")}
        className={cn(
          "flex gap-2.5 items-center justify-center px-4 py-2 rounded-full font-open-sans relative z-10 select-none cursor-pointer",
          activeTab === "events"
            ? "text-white font-bold"
            : "text-[#3d3d3d] hover:bg-[#e8e4e0]/30 hover:text-[#3d3d3d]/90 font-normal transition-colors duration-200"
        )}
      >
        <span className="text-sm">{eventsTitle}</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold min-w-5 text-center leading-none flex items-center justify-center transition-colors duration-300",
            activeTab === "events"
              ? "bg-white/20 text-white"
              : "bg-[#e8e4e0]/60 text-[#3d3d3d]"
          )}
        >
          {eventsCount}
        </span>
      </button>
    </div>
  )
}
