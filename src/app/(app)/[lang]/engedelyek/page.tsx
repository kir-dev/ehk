import PermissionsList from "@/app/(app)/[lang]/engedelyek/components/PermissionsList";
import { LoadingDecisionsGrid as LoadingPermissionsGrid } from "@/components/common/LoadingSpinner";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { Suspense } from "react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function PermissionsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "hu" | "en");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title={dictionary.permissions.title} 
          description={dictionary.permissions.description}
        />
        <Suspense fallback={<LoadingPermissionsGrid />}>
          {/* Server component fetching and rendering */}
          <PermissionsList />
        </Suspense>
      </div>
    </div>
  )
}
