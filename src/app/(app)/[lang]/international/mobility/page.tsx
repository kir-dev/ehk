import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import { MobilityContent } from "./components/MobilityContent";
import type { Mobility } from "./mobility.types";

export default async function MobilityPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale, "international_mobility");
  const content = dictionary.international.mobility as unknown as Mobility;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <main className="min-w-0">
          <PageHeader subtitle={content.intro} title={content.title} />
          <MobilityContent locale={locale} sections={content.sections} />
        </main>
      </div>
    </div>
  );
}
