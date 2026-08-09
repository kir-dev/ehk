import { LinksSidebar } from "@/components/common/LinksSidebar";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import { EducationContent } from "./components/EducationContent";
import { EDUCATION_LINKS } from "./education.constants";
import type { Education } from "./education.types";

export default async function EducationPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale, "international_education");
  const content = dictionary.international.education as unknown as Education;
  const { action, text } = content.sidebar;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <main className="min-w-0">
            <PageHeader title={content.title} />
            <EducationContent sections={content.sections} />
          </main>

          <LinksSidebar
            groups={[
              {
                description: text,
                links: [
                  { href: EDUCATION_LINKS[action.link], label: action.label },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
