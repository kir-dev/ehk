import { getAcademicRegulations } from "@/lib/payload-cms";
import type { Regulation } from "@/payload-types";
import RegulationsListClient from "./RegulationsListClient";

export default async function RegulationsList({ loader = getAcademicRegulations }: { loader?: () => Promise<Regulation[]> }) {
  const regulations = await loader();
  return <RegulationsListClient regulations={regulations} />;
}
