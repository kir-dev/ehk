"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";

interface Payout {
  month_hu: string;
  month_en: string;
  date: string;
}

interface PayoutDatesProps {
  autumnPayouts: Payout[] | undefined | null;
  springPayouts: Payout[] | undefined | null;
  lang: Locale;
  autumnLabel: string;
  springLabel: string;
}

type Semester = "autumn" | "spring";

export function PayoutDates({
  autumnPayouts,
  springPayouts,
  lang,
  autumnLabel,
  springLabel,
}: Readonly<PayoutDatesProps>) {
  const [selected, setSelected] = React.useState<Semester>("autumn");
  const autumnRef = React.useRef<HTMLButtonElement>(null);
  const springRef = React.useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = React.useState<React.CSSProperties>({
    left: 4,
    width: 0,
    opacity: 0,
  });
  const [isMounted, setIsMounted] = React.useState(false);

  // Measure and update the sliding background position
  React.useEffect(() => {
    const updateSlider = () => {
      const activeRef = selected === "autumn" ? autumnRef.current : springRef.current;
      if (activeRef) {
        setSliderStyle({
          left: activeRef.offsetLeft,
          width: activeRef.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateSlider();

    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [selected, autumnLabel, springLabel]);

  // Track mount state to trigger transitions only after the initial paint
  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const semesters: { key: Semester; label: string; ref: React.RefObject<HTMLButtonElement | null>; payouts: Payout[] | undefined | null }[] = [
    { key: "autumn", label: autumnLabel, ref: autumnRef, payouts: autumnPayouts },
    { key: "spring", label: springLabel, ref: springRef, payouts: springPayouts },
  ];

  return (
    <div className="flex flex-col gap-4 border border-[#e9e2d6] rounded-2xl p-4 bg-[#fffefc]">
      {/* Capsule semester switcher */}
      <div
        role="tablist"
        aria-label={`${autumnLabel} / ${springLabel}`}
        className="relative flex gap-1 p-1 rounded-full bg-[#fffefc] border border-[#e8e4e0]"
      >
        {/* Sliding active tab indicator */}
        <div
          className={cn(
            "absolute bg-[#862633] rounded-full h-[calc(100%-8px)] top-1",
            isMounted ? "transition-all duration-300 ease-in-out" : "transition-none"
          )}
          style={sliderStyle}
        />

        {semesters.map((semester) => (
          <button
            key={semester.key}
            ref={semester.ref}
            type="button"
            role="tab"
            aria-selected={selected === semester.key}
            onClick={() => setSelected(semester.key)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center px-4 py-2 rounded-full font-open-sans text-sm leading-[1.6] cursor-pointer",
              selected === semester.key
                ? "text-white font-bold"
                : "text-[#3d3d3d] font-normal hover:text-[#862633] transition-colors duration-200"
            )}
          >
            {semester.label}
          </button>
        ))}
      </div>

      <div className="h-px w-full bg-[#e9e2d6]" />

      {/* Payout lists — both stacked in the same grid cell so the card keeps
          the height of the longer list and does not jump on tab change */}
      <div className="grid">
        {semesters.map((semester) => (
          <div
            key={semester.key}
            role="tabpanel"
            aria-hidden={selected !== semester.key}
            className={cn(
              "col-start-1 row-start-1 flex flex-col transition-opacity duration-300",
              selected === semester.key ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {semester.payouts && semester.payouts.length > 0 ? (
              semester.payouts.map((payout, index) => (
                <div key={payout.month_hu + payout.date + index} className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start font-open-sans font-semibold text-[13px] text-[#3d3d3d]">
                    <p className="flex-1 capitalize">
                      {lang === "hu" ? payout.month_hu : payout.month_en}
                    </p>
                    <p className="flex-1 text-right">{payout.date || "-"}</p>
                  </div>
                  {index < semester.payouts!.length - 1 && (
                    <div className="h-px w-full bg-[#e9e2d6] mb-4" />
                  )}
                </div>
              ))
            ) : (
              <p className="font-open-sans text-[13px] text-[#9a9a9a] italic">-</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
