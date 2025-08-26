import { Suspense } from "react"
import { PermissionsHeader } from "@/components/permissions-header"
import PermissionsList from "@/components/permissions-list"
import { LoadingDecisionsGrid as LoadingPermissionsGrid } from "@/components/loading-spinner"

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
