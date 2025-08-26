import { getRegulations } from "@/lib/payload-cms";
import RegulationsListClient from "./regulations-list-client";

export default async function RegulationsList() {
  const regulations = await getRegulations();
  return <RegulationsListClient regulations={regulations} />;
}
