export function LoadingRepresentativeCard() {
  return (
    <div className="relative min-h-[31.6rem] animate-pulse pt-16">
      <div className="absolute left-1/2 top-0 z-10 h-[18.5rem] w-[min(70%,16.45rem)] -translate-x-1/2 rounded-2xl border border-[#e9e2d6] bg-[#e8e4e0]" />
      <div className="absolute left-1/2 top-[17.35rem] z-20 h-9 w-16 -translate-x-1/2 rounded-lg bg-[#e8e4e0]" />

      <div className="flex min-h-[28.3rem] flex-col items-center justify-between rounded-2xl border border-[#e9e2d6] bg-[#fffefc] px-8 pb-8 pt-[16.6rem]">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="h-7 w-32 rounded bg-[#e8e4e0]" />
          <div className="h-5 w-56 max-w-full rounded bg-[#e8e4e0]" />
          <div className="h-4 w-44 max-w-full rounded bg-[#e8e4e0]" />
        </div>

        <div className="w-full border-t border-[#e9e2d6] pt-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 rounded bg-[#e8e4e0]" />
            <div className="h-6 w-6 rounded-full bg-[#e8e4e0]" />
          </div>
        </div>
      </div>
    </div>
  );
}
