import { Suspense } from "react"
import { PermissionsHeader } from "@/app/(app)/engedelyek/components/PermissionsHeader"
import PermissionsList from "@/app/(app)/engedelyek/components/PermissionsList"
import { LoadingDecisionsGrid as LoadingPermissionsGrid } from "@/components/common/LoadingSpinner"

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PermissionsHeader />
        <Suspense fallback={<LoadingPermissionsGrid />}>
          {/* Server component fetching and rendering */}
          <PermissionsList />
        </Suspense>
      </div>
    </div>
  )
}
