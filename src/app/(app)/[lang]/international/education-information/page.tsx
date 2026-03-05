import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import EducationInformationContent from "./components/EducationInformationContent";

export default async function EducationInformationPage({
  params 
}: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.international.education_information;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={content.title} />
        <EducationInformationContent content={content} />
      </div>
    </div>
  );
}
