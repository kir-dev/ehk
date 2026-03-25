import { EducationInformationData } from "./components/types";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSideNav } from "@/components/common/PageSideNav";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import EducationInformationContent from "./components/EducationInformationContent";

export default async function EducationInformationPage({
  params 
}: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.international.education_information as EducationInformationData;

  const sections = [
    { id: "subject-description", title: content.nav.subject_description },
    { id: "registration-periods", title: content.nav.registration_periods },
    { id: "code-of-studies", title: content.nav.code_of_studies },
    { id: "evaluation", title: content.nav.evaluation },
    { id: "semester-info", title: content.nav.semester_info },
    { id: "tdk", title: content.nav.tdk },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto px-4 py-4 lg:py-8 max-w-screen-2xl">
        <div className="mb-12">
          <PageHeader title={content.title} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 relative items-start">
          <PageSideNav 
            mainSectionsTitle={content.nav.main_sections}
            sections={sections}
          />

          <div className="flex-1 min-w-0 space-y-16 pb-24">
            <EducationInformationContent content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
