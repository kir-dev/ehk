import { getPermissions } from "@/lib/payload-cms";
import PermissionsListClient from "@/app/(app)/[lang]/engedelyek/components/PermissionsListClient";

export default async function PermissionsList({ locale }: { locale?: 'hu' | 'en' }) {
  const permissions = await getPermissions();
  return <PermissionsListClient permissions={permissions} />;
}
