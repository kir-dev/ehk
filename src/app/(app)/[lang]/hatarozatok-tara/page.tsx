import { DecisionsArchive } from "@/app/(app)/[lang]/hatarozatok-tara/components/DecisionsArchive";
import { LoadingDecisionsGrid } from "@/components/common/LoadingSpinner";
import { Suspense } from "react";

export default async function DecisionsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingDecisionsGrid />}>
                <DecisionsArchive />
            </Suspense>
        </div>
    )
}
