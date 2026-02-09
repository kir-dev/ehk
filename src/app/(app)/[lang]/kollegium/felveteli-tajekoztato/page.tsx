import { LoadingRegulationsGrid } from "@/components/common/LoadingSpinner"
import DormitoryAdmissionInformationContent from "@/app/(app)/[lang]/kollegium/felveteli-tajekoztato/components/DormitoryAdmissionIinformationContent"
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function AdmissionInformationPage({
  params }: Readonly<{ params: Promise<{ lang: Locale }> }>){
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const admission_information = dictionary.dormitories.admission_information;
  const faculties = dictionary.faculties;
  const content = {
    admission_information,
    faculties
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={dictionary.dormitories.admission_information.title} />
        <Suspense fallback={<LoadingRegulationsGrid />}>
          <DormitoryAdmissionInformationContent content={content}/>
        </Suspense>
      </div>
    </div>
  )
}
