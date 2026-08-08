import { LinksSidebar } from "@/components/common/LinksSidebar";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import { HousingContent } from "./components/HousingContent";
import { HOUSING_LINKS } from "./housing.constants";
import type { Housing } from "./housing.types";

export default async function HousingPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale, "international_housing");
  const content = dictionary.international.housing as unknown as Housing;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <main className="min-w-0">
            <PageHeader title={content.title} />
            <HousingContent faq={content.faq} />
          </main>

          <LinksSidebar
            groups={[
              {
                links: content.links.map((link) => ({
                  href: HOUSING_LINKS[link.link],
                  label: link.label,
                })),
                title: content.important_links,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
