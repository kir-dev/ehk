import { getHelp } from "@/lib/payload-cms";
import HelpPageList from "./HelpPageList";

export default async function HelpPageContent() {
  const help = await getHelp();

  return <HelpPageList help={help} />;
}
