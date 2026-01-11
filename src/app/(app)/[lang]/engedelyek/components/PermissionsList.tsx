import PermissionsListClient from "@/app/(app)/[lang]/engedelyek/components/PermissionsListClient";
import { getPermissions } from "@/lib/payload-cms";
import type { Permission } from "@/payload-types";

export default async function PermissionsList({ loader = getPermissions }: { loader?: (locale?: 'hu' | 'en') => Promise<Permission[]> }) {
  const permissions = await loader();
  return <PermissionsListClient permissions={permissions} />;
}
