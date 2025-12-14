export function LoadingRepresentativeCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-64 bg-gray-200"></div>

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}
