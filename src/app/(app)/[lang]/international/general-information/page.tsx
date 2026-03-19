import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { ExternalLink } from "lucide-react";
import { GettingStartedSection } from "./components/GettingStartedSection";
import { UniversitySystemsSection } from "./components/UniversitySystemsSection";
import { StudentLifeSection } from "./components/StudentLifeSection";
import { ContactsSection } from "./components/ContactsSection";

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto px-4 py-10 lg:py-16 max-w-screen-2xl">
        <div className="mb-12">
          <PageHeader title={content.title} description={content.description} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 relative items-start">
          {/* Side Navigation */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky top-28 h-fit space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/80">
                <span className="font-bold text-xs uppercase tracking-widest text-gray-500">
                  {lang === "hu" ? "Tartalomjegyzék" : "Main Sections"}
                </span>
              </div>
              <nav className="flex flex-col py-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center px-5 py-3 text-sm font-semibold transition-all border-l-4 border-transparent hover:bg-red-50/50 hover:text-ehk-dark-red hover:border-ehk-dark-red"
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-300 mr-3 group-hover:bg-ehk-light-red transition-colors flex-shrink-0"></span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
            
            {/* Quick links card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
              <div className="p-4 border-b border-gray-100 bg-gray-50/80">
                <span className="font-bold text-xs uppercase tracking-widest text-gray-500">
                  {lang === "hu" ? "Portálok" : "Portals"}
                </span>
              </div>
              <div className="p-3 space-y-1">
                {[
                  { name: "Neptun", url: "https://neptun.bme.hu/hallgatoi/login.aspx" },
                  { name: "Moodle", url: "https://edu.vik.bme.hu/" },
                  { name: "KTH (ASC)", url: "https://kth.bme.hu/" }
                ].map((portal) => (
                  <a key={portal.name} href={portal.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium text-gray-700 group">
                    <span>{portal.name}</span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-ehk-dark-red" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-16 pb-24">
            <GettingStartedSection content={content} lang={lang} />
            <UniversitySystemsSection content={content} lang={lang} />
            <StudentLifeSection content={content} lang={lang} />
            <ContactsSection content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
