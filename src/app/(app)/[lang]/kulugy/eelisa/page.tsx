export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { getEelisaPage } from "@/lib/payload-cms";
import { notFound } from "next/navigation";
import EELISAContent from "./components/EELISAContent";
import { EelisaSidebar } from "./components/EelisaSidebar";

export default async function EELISAPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const [dictionary, cmsContent] = await Promise.all([
    getDictionary(locale, "eelisa"),
    getEelisaPage(),
  ]);
  const content = dictionary.kulugy?.eelisa;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid items-start min-[1400px]:grid-cols-[minmax(0,993px)_343px]">
          <main className="min-w-0">
            <PageHeader title={content.title} />
            <EELISAContent
              cmsContent={cmsContent}
              isEnglish={locale === "en"}
              staticContent={content}
            />
          </main>
          <EelisaSidebar
            contacts={cmsContent.sidebarContacts ?? []}
            contactsTitle={content.sidebar.contacts_title}
            isEnglish={locale === "en"}
            links={cmsContent.sidebarLinks ?? []}
            linksTitle={content.sidebar.links_title}
          />
        </div>
      </div>
    </div>
  );
}
