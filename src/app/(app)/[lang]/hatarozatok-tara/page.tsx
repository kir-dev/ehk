import { DecisionsArchive } from "@/app/(app)/[lang]/hatarozatok-tara/components/DecisionsArchive"
import { Suspense } from "react"
import { LoadingDecisionsGrid } from "@/components/common/LoadingSpinner"

export default async function DecisionsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingDecisionsGrid />}>
                <DecisionsArchive  locale={lang as 'hu' | 'en'} />
            </Suspense>
        </div>
    )
}
