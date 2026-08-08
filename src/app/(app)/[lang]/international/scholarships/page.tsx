import { LinksSidebar } from "@/components/common/LinksSidebar";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import { ScholarshipsContent } from "./components/ScholarshipsContent";
import { SCHOLARSHIPS_LINKS } from "./scholarships.constants";
import type { Scholarships } from "./scholarships.types";

export default async function ScholarshipsPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale, "international_scholarships");
  const content = dictionary.international
    .scholarships as unknown as Scholarships;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <main className="min-w-0">
            <PageHeader subtitle={content.intro} title={content.title} />
            <ScholarshipsContent sections={content.sections} />
          </main>

          <LinksSidebar
            groups={[
              {
                links: content.links.map((link) => ({
                  href: SCHOLARSHIPS_LINKS[link.link],
                  label: link.label,
                })),
                title: content.important_links,
              },
              {
                links: content.contact_links.map((link) => ({
                  href: SCHOLARSHIPS_LINKS[link.link],
                  label: link.label,
                  variant: "secondary" as const,
                })),
                title: content.contact_title,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
