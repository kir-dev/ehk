export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start min-[1400px]:grid-cols-[minmax(0,993px)_343px]">
          <main className="min-w-0 animate-pulse">
            <div className="h-[72px] rounded-t-2xl border border-[#e9e2d6] bg-[#fffefc]" />
            <div className="h-[102px] border border-[#e9e2d6] bg-[#862633]" />
            <div className="space-y-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
              <div className="h-48 rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0]" />
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="h-[438px] rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0]" />
                <div className="h-[622px] rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0]" />
              </div>
            </div>
          </main>
          <aside className="mt-4 h-40 animate-pulse rounded-2xl border border-[#e9e2d6] bg-[#fffefc] md:mt-8" />
        </div>
      </div>
    </div>
  );
}
