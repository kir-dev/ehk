import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import ErasmusContent from "./components/ErasmusContent";

export default async function ErasmusPage({
  params 
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  const content = dictionary.kulugy?.erasmus;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={content.title} />
        <ErasmusContent content={content} />
      </div>
    </div>
  );
}
