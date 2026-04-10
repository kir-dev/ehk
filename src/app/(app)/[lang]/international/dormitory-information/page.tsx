import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import DormitoryInformationContent from "./components/DormitoryInformationContent";

export default async function DormitoryInformationPage({
  params
}: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.international.dormitory_information;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={content.title} />
        <DormitoryInformationContent content={content} />
      </div>
    </div>
  );
}
