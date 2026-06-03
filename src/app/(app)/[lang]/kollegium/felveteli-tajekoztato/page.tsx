import DormitoryAdmissionInformationContent from "@/app/(app)/[lang]/kollegium/felveteli-tajekoztato/components/DormitoryAdmissionInformationContent"
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function AdmissionInformationPage({
  params }: Readonly<{ params: Promise<{ lang: Locale }> }>){
  const { lang } = await params;
  const dormDict = await getDictionary(lang, 'dormitories');
  const commonDict = await getDictionary(lang, 'common');

  const admission_information = dormDict.dormitories.admission_information;
  const faculties = commonDict.faculties;
  const content = {
    admission_information,
    faculties
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={dormDict.dormitories.admission_information.title} />
        <DormitoryAdmissionInformationContent content={content}/>
      </div>
    </div>
  )
}
