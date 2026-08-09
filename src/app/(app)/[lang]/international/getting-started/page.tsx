import { LinksSidebar } from "@/components/common/LinksSidebar";
import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import { GettingStartedContent } from "./components/GettingStartedContent";
import { GETTING_STARTED_LINKS } from "./gettingStarted.constants";
import type { GettingStarted } from "./gettingStarted.types";

export default async function GettingStartedPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(
    locale,
    "international_getting_started"
  );
  const content = dictionary.international
    .getting_started as unknown as GettingStarted;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,343px)]">
          <main className="min-w-0">
            <PageHeader title={content.title} />
            <GettingStartedContent
              locale={locale}
              sections={content.sections}
            />
          </main>

          <LinksSidebar
            links={content.sidebar_links.map((link) => ({
              href: GETTING_STARTED_LINKS[link.link],
              label: link.label,
            }))}
            title={content.important_links}
          />
        </div>
      </div>
    </div>
  );
}
