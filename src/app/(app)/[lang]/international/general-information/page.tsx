import { PageHeader } from "@/components/common/PageHeader";
import { PageSideNav } from "@/components/common/PageSideNav";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { ContactsSection } from "./components/ContactsSection";
import { GettingStartedSection } from "./components/GettingStartedSection";
import { StudentLifeSection } from "./components/StudentLifeSection";
import { UniversitySystemsSection } from "./components/UniversitySystemsSection";

export default async function GeneralInformationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang as "hu" | "en")
    ? (lang as "hu" | "en")
    : i18n.defaultLocale;
  const dictionary = await getDictionary(validLang);
  const content = dictionary.international?.general_information;

  if (!content) {
    return null;
  }

  const sections = [
    { id: "getting-started", title: content.nav.getting_started },
    { id: "university-systems", title: content.nav.university_systems },
    { id: "student-life", title: content.nav.student_life },
    { id: "contacts-and-explore", title: content.nav.contacts },
  ];
  const nav = content.nav as typeof content.nav & { portals: string };

  const quickLinks = [
    { name: "Neptun", url: "https://neptun.bme.hu/hallgatoi/login.aspx" },
    { name: "Moodle", url: "https://edu.vik.bme.hu/" },
    { name: "KTH (ASC)", url: "https://kth.bme.hu/" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto px-4 py-4 lg:py-8 max-w-screen-2xl">
        <div className="mb-12">
          <PageHeader title={content.title} description={content.description} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 relative items-start">
          <PageSideNav 
            mainSectionsTitle={content.nav.main_sections}
            sections={sections}
            portalsTitle={nav.portals}
            quickLinks={quickLinks}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-16 pb-24">
            <GettingStartedSection content={content} />
            <UniversitySystemsSection content={content} />
            <StudentLifeSection content={content} />
            <ContactsSection content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
