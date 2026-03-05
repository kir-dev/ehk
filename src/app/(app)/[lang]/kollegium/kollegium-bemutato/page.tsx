import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import DormitoryCardsContainer from "../felveteli-tajekoztato/components/DormitoryCardsContainer";

export default async function AdmissionInformationPage({
  params }: Readonly<{ params: Promise<{ lang: Locale }> }>){
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={dictionary.dormitories.admission_information.introduction} />
        <DormitoryCardsContainer dormitory={dictionary.dormitories.admission_information.dormitory} linkOrRoute="route"/>
      </div>
    </div>
  )
}
