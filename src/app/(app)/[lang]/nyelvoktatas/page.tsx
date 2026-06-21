import LanguageEducationContent from "@/app/(app)/[lang]/nyelvoktatas/components/LanguageEducationContent";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function LanguageEducationPage({
  params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'language_education');

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <LanguageEducationContent content={dictionary.language_education} />
      </div>
    </div>
  );
}
