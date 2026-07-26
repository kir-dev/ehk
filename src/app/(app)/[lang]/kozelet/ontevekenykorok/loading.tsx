export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] animate-pulse px-4 py-8 md:px-8">
        <div className="h-40 rounded-t-2xl bg-ehk-dark-red/20" />
        <div className="space-y-4 rounded-b-2xl border-x border-b border-border bg-[#fffefc] p-4 md:p-8">
          {[0, 1].map((item) => (
            <div key={item} className="h-80 rounded-2xl bg-[#f9f4f0]" />
          ))}
        </div>
      </div>
    </div>
  );
}
