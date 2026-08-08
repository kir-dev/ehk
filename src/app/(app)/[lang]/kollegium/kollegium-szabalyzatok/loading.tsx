import { LoadingRegulationsGrid } from "@/components/regulations/skeletons/LoadingRegulationsGrid";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <LoadingRegulationsGrid />
      </div>
    </div>
  );
}
