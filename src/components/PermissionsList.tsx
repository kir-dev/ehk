import { getPermissions } from "@/lib/payload-cms";
import PermissionsListClient from "@/components/PermissionsListClient";

export default async function PermissionsList() {
  const permissions = await getPermissions();
  return <PermissionsListClient permissions={permissions} />;
}
