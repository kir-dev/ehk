import { Suspense } from "react"
import { PermissionsHeader } from "@/app/(app)/[lang]/engedelyek/components/PermissionsHeader"
import PermissionsList from "@/app/(app)/[lang]/engedelyek/components/PermissionsList"
import { LoadingDecisionsGrid as LoadingPermissionsGrid } from "@/components/common/LoadingSpinner"

export default async function PermissionsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PermissionsHeader locale={lang as 'hu' | 'en'} />
        <Suspense fallback={<LoadingPermissionsGrid />}>
          {/* Server component fetching and rendering */}
          <PermissionsList  locale={lang as 'hu' | 'en'} />
        </Suspense>
      </div>
    </div>
  )
}
