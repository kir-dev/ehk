"use client";

import * as React from "react";
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

  const payouts = selected === "autumn" ? autumnPayouts : springPayouts;

  const tabBase =
    "flex-1 flex items-center justify-center px-4 py-2 rounded-full text-sm leading-[1.6] transition-colors cursor-pointer";
  const tabActive = "bg-[#862633] text-white font-open-sans font-bold";
  const tabInactive =
    "text-[#3d3d3d] font-open-sans font-normal hover:text-[#862633]";

  return (
    <div className="flex flex-col gap-4 border border-[#e9e2d6] rounded-2xl p-4 bg-[#fffefc]">
      {/* Capsule semester switcher */}
      <div
        role="tablist"
        aria-label={`${autumnLabel} / ${springLabel}`}
        className="flex gap-1 p-1 rounded-full bg-[#fffefc] border border-[#e8e4e0]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selected === "autumn"}
          onClick={() => setSelected("autumn")}
          className={`${tabBase} ${selected === "autumn" ? tabActive : tabInactive}`}
        >
          {autumnLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selected === "spring"}
          onClick={() => setSelected("spring")}
          className={`${tabBase} ${selected === "spring" ? tabActive : tabInactive}`}
        >
          {springLabel}
        </button>
      </div>

      <div className="h-px w-full bg-[#e9e2d6]" />

      {/* Payout list */}
      <div className="flex flex-col">
        {payouts && payouts.length > 0 ? (
          payouts.map((payout, index) => (
            <div key={payout.month_hu + payout.date + index} className="flex flex-col gap-4">
              <div className="flex gap-4 items-start font-open-sans font-semibold text-[13px] text-[#3d3d3d]">
                <p className="flex-1 capitalize">
                  {lang === "hu" ? payout.month_hu : payout.month_en}
                </p>
                <p className="flex-1 text-right">{payout.date || "-"}</p>
              </div>
              {index < payouts.length - 1 && (
                <div className="h-px w-full bg-[#e9e2d6] mb-4" />
              )}
            </div>
          ))
        ) : (
          <p className="font-open-sans text-[13px] text-[#9a9a9a] italic">-</p>
        )}
      </div>
    </div>
  );
}
