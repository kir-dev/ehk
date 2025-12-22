"use client";

export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh] py-16">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
        {text && (
          <div className="text-center mt-6">
            <p className="text-[#862633] font-medium text-lg animate-pulse">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
