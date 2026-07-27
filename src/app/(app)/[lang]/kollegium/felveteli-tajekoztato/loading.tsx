export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] animate-pulse px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <div>
            <div className="h-44 rounded-t-2xl bg-ehk-dark-red/20" />
            <div className="h-[606px] rounded-b-2xl border border-[#e9e2d6] bg-[#fffefc]" />
          </div>
          <div className="mt-4 h-[410px] rounded-2xl border border-[#e9e2d6] bg-[#fffefc] xl:mt-8 xl:rounded-l-none" />
        </div>
      </div>
    </div>
  );
}
