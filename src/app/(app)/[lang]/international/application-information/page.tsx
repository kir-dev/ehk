import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import ApplicationInformationContent from "./components/ApplicationInformationContent";

export default async function ApplicationInformationPage({
  params
}: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.international.application_information;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={content.title} />
        <ApplicationInformationContent content={content} />
      </div>
    </div>
  );
}
