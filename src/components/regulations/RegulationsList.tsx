import { getAcademicRegulations } from "@/lib/payload-cms";
import RegulationsListClient from "./RegulationsListClient";
import type { Regulation } from "@/payload-types";

export default async function RegulationsList({ loader = getAcademicRegulations }: { loader?: () => Promise<Regulation[]> }) {
  const regulations = await loader();
  return <RegulationsListClient regulations={regulations} />;
}
