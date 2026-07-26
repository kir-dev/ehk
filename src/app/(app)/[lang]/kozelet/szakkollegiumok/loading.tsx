export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="h-20 rounded-t-2xl border border-[#e9e2d6] bg-[#fffefc]" />
        <div className="h-40 border-x border-[#e9e2d6] bg-[#862633]" />
        <div className="space-y-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-72 rounded-2xl border border-[#e9e2d6] bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
