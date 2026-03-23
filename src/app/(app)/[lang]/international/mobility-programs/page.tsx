import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import MobilityProgramsContent from "./components/MobilityProgramsContent";
import { MobilityProgramsData } from "./components/types";

export default async function MobilityProgramsPage({
  params
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.international.mobility_programs as MobilityProgramsData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={content.title} />
        <MobilityProgramsContent content={content} />
      </div>
    </div>
  );
}
