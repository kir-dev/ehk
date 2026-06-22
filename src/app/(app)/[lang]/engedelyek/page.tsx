export const dynamic = "force-dynamic";

import PermissionsList from "@/app/(app)/[lang]/engedelyek/components/PermissionsList";
import { LanguageProvider } from "@/components/common/LanguageProvider";
import { LoadingPermissionsGrid } from "@/app/(app)/[lang]/engedelyek/components/skeletons/LoadingPermissionsGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { Suspense } from "react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function PermissionsPage({
  params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang as 'hu' | 'en') ? lang as "hu" | "en" : i18n.defaultLocale;
  const dictionary = await getDictionary(validLang, "permissions");

  return (
    <LanguageProvider defaultLang={validLang.toUpperCase() as "HU" | "EN"} dictionary={dictionary}>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingPermissionsGrid />}>
          {/* Server component fetching and rendering (renders its own PageHeader) */}
          <PermissionsList />
        </Suspense>
      </div>
    </LanguageProvider>
  )
}
