import { getAcademicRegulations } from "@/lib/payload-cms";
import RegulationsListClient from "./regulations-list-client";
import type { Regulation } from "@/payload-types";

export default async function RegulationsList({ loader = getAcademicRegulations }: { loader?: () => Promise<Regulation[]> }) {
  const regulations = await loader();
  return <RegulationsListClient regulations={regulations} />;
}
