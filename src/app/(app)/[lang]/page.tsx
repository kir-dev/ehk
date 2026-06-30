export const dynamic = 'force-dynamic';

import React from 'react';
import ImageViewer from '@/app/(app)/components/ImageViewer';
import OfficeHours from '@/app/(app)/components/OfficeHours';
import ImportantLinks from '@/app/(app)/components/ImportantLinks';
import MuhelyWidget from '@/app/(app)/components/MuhelyWidget';
import HomeContent from './HomeContent';
import { getHeroImages } from '@/lib/get-hero-images';
import { getEvents, getNews } from '@/lib/payload-cms';
import { LanguageProvider, Lang } from '@/components/common/LanguageProvider';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';


export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const sp = await searchParams;
  const rawPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  const initialTab = sp?.tab === 'events' ? 'events' : 'news';
  const rawTag = sp?.tag;
  const tagFilter = typeof rawTag === 'string'
    ? rawTag
    : Array.isArray(rawTag)
    ? rawTag.filter(Boolean).join(',')
    : undefined;
  const initialTags = tagFilter ? tagFilter.split(',').filter(Boolean) : [];

  const [heroImages, dictionary, initialNewsData, eventsAll] = await Promise.all([
    getHeroImages(lang),
    getDictionary(lang, 'news'),
    getNews({ page, limit: 6, tag: tagFilter }),
    getEvents(),
  ]);

  return (
    <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
      <div className="bg-[#fcfaf6] min-h-screen flex flex-col">
        <main className="grow">
          <section className="w-full">
            <div className="max-w-screen">
              <ImageViewer images={heroImages} />
            </div>
          </section>

          <section className="px-4 md:px-6 py-8">
            <div className="max-w-350 mx-auto">
              <div id="main-content-section" className="h-0" aria-hidden />

              <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-8 items-start -mt-16 lg:-mt-24 relative z-10">

                <aside className="flex flex-col gap-4 order-2 lg:order-1 w-full lg:max-w-60">
                  <OfficeHours />
                  <ImportantLinks />
                  <MuhelyWidget />
                </aside>

                <div className="bg-[#fffefc] border border-[#e9e2d6] p-6 md:p-8 rounded-xl shadow-sm flex flex-col order-1 lg:order-2 min-w-0 w-full">
                  <HomeContent
                    lang={lang}
                    dictionary={dictionary as unknown as Record<string, Record<string, string>>}
                    initialNewsData={initialNewsData}
                    eventsAll={eventsAll}
                    initialTab={initialTab}
                    initialTags={initialTags}
                  />
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </LanguageProvider>
  );
}
