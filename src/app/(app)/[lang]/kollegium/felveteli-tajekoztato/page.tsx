import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import DormitoryAdmissionInformationContent from "./components/DormitoryAdmissionInformationContent";
import { ImportantLinksSidebar } from "./components/ImportantLinksSidebar";

export default async function AdmissionInformationPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const [dormitoryDictionary, commonDictionary] = await Promise.all([
    getDictionary(locale, "dormitories"),
    getDictionary(locale, "common"),
  ]);
  const content = dormitoryDictionary.dormitories.admission_information;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <main className="min-w-0">
            <PageHeader title={content.title} />
            <DormitoryAdmissionInformationContent
              content={content}
              locale={locale}
            />
          </main>

          <ImportantLinksSidebar
            content={content}
            faculties={commonDictionary.faculties}
          />
        </div>
      </div>
    </div>
  );
}
