export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        {/* PageHeader skeleton */}
        <div className="w-full">
          <div className="w-full bg-[#fffefc] border-t border-x border-[#e9e2d6] px-6 py-4 md:px-8 rounded-t-2xl">
            <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="w-full bg-[#862633] border border-[#e9e2d6] p-6 md:p-8 flex flex-col gap-3">
            <div className="h-9 w-2/3 bg-white/20 rounded animate-pulse" />
            <div className="h-5 w-full bg-white/15 rounded animate-pulse" />
            <div className="h-5 w-4/5 bg-white/15 rounded animate-pulse" />
          </div>
        </div>

        {/* Club card skeletons */}
        <div className="flex flex-col gap-6 mt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-full animate-pulse">
              <div className="bg-[#fffefc] border-t border-x border-[#e9e2d6] px-8 py-4 rounded-tl-lg rounded-tr-lg h-[77px]" />
              <div className="h-[200px] md:h-[312px] border-x border-[#e9e2d6] bg-gray-200" />
              <div className="bg-[#fffefc] border border-[#e9e2d6] px-8 py-4 rounded-bl-lg rounded-br-lg flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1 h-16 bg-gray-100 rounded" />
                  <div className="flex-1 h-16 bg-gray-100 rounded" />
                  <div className="flex-1 h-16 bg-gray-100 rounded" />
                </div>
                <div className="h-20 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
