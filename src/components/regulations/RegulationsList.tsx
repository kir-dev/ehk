import { getAcademicRegulations } from "@/lib/payload-cms";
import type { Regulation } from "@/payload-types";
import RegulationsListClient from "./RegulationsListClient";

export default async function RegulationsList({ locale, loader = getAcademicRegulations }: { locale?: 'hu' | 'en';  loader?: (locale?: 'hu' | 'en') => Promise<Regulation[]> }) {
  const regulations = await loader(locale);
  return <RegulationsListClient regulations={regulations} />;
}
