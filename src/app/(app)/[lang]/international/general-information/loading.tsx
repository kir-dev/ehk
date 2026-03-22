import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function Loading() {
  return (
    <div 
      className="min-h-[50vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <LoadingSpinner />
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
