"use client";

export function LoadingRegulationsGrid() {
  return (
    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-4 md:p-6 animate-pulse"
          >
            <div className="h-5 w-3/5 rounded bg-[#e9e2d6]" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-[#f0e9df]" />
              <div className="h-3 w-11/12 rounded bg-[#f0e9df]" />
              <div className="h-3 w-2/3 rounded bg-[#f0e9df]" />
            </div>
            <div className="mt-1 flex items-center justify-between gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-4">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 rounded bg-[#f0e9df]" />
                <div className="h-5 w-14 rounded-full bg-[#f0e9df]" />
              </div>
              <div className="h-8 w-28 rounded-2xl bg-[#f0e9df]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
