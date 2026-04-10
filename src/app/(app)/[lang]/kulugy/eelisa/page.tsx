import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import EELISAContent from "./components/EELISAContent";

export default async function EELISAPage({
  params 
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.kulugy?.eelisa;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={content?.title} />
        <EELISAContent content={content} />
      </div>
    </div>
  );
}
