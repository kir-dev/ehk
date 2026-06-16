export const dynamic = 'force-dynamic';

import React from 'react';
import ImageViewer from '@/app/(app)/components/ImageViewer';
import OfficeHours from '@/app/(app)/components/OfficeHours';
import ImportantLinks from '@/app/(app)/components/ImportantLinks';
import MuhelyWidget from '@/app/(app)/components/MuhelyWidget';
import Switcher from '@/app/(app)/components/Switcher';
import NewsSection from '@/app/(app)/components/NewsSection';
import EventsSection from '@/app/(app)/components/EventsSection';
import NewsFilter from '@/app/(app)/components/NewsFilter';
import { getHeroImages } from '@/lib/get-hero-images';
import { getEvents, getEhkEvents, getNews } from '@/lib/payload-cms';
import { LanguageProvider, Lang } from '@/components/common/LanguageProvider';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Event } from '@/payload-types';


export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const currentLang = lang;

  const sp = await searchParams; // Next.js 15 dynamic API requires await
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  // Active tab: 'news' | 'events'
  const activeTab = sp?.tab === 'events' ? 'events' : 'news';
  const tagFilter = typeof sp?.tag === 'string' ? sp.tag : undefined;

  const [heroImages, dictionary, newsData, ehkEventsAll, eventsAll] = await Promise.all([
    getHeroImages(currentLang),
    getDictionary(currentLang, 'news'),
    getNews({ limit: 1 }),
    getEhkEvents(),
    activeTab === 'events' ? getEvents() : Promise.resolve([] as Event[]),
  ]);

  const events = eventsAll;
  const ehkEvents = activeTab === 'events' ? ehkEventsAll : [];




  return (
    <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
      <div className="bg-[#fcfaf6] min-h-screen flex flex-col">
        {/* Hero */}
        <main className="grow">
          <section className="w-full">
            <div className="max-w-screen">
              <ImageViewer images={heroImages} />
            </div>
          </section>

          {/* Grid sections */}
          <section className="px-4 md:px-6 py-8">
            <div className="max-w-350 mx-auto">
              <div id="main-content-section" className="h-0" aria-hidden />

              <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-8 items-start -mt-16 lg:-mt-24 relative z-10">
                
                {/* Left Column: Shared Sidebar on desktop, stacked at bottom on mobile */}
                <aside className="flex flex-col gap-4 order-2 lg:order-1 w-full lg:max-w-60">
                  <OfficeHours />
                  <ImportantLinks />
                  <MuhelyWidget />
                </aside>

                {/* Right Column: Main Content area with Tabs */}
                <div className="bg-[#fffefc] border border-[#e9e2d6] p-6 md:p-8 rounded-xl shadow-sm flex flex-col order-1 lg:order-2 min-w-0 w-full">
                  {/* Switcher & Filters row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Switcher
                      activeTab={activeTab}
                      newsCount={newsData.totalDocs}
                      eventsCount={ehkEventsAll.length}
                      newsTitle={dictionary.news.title}
                      eventsTitle={dictionary.rendezvenyek.title}
                      basePath={`/${lang}`}
                    />

                    {activeTab === 'news' && (
                      <NewsFilter basePath={`/${lang}`} />
                    )}
                  </div>

                  {/* Active Tab Contents */}
                  {activeTab === 'news' ? (
                    <div className="flex flex-col w-full animate-in fade-in duration-300">
                      {/* Fresh News Header Block */}
                      <div className="bg-[#862633] text-white pt-5 pb-10 px-6 md:px-8 -mx-6 md:-mx-8 relative z-0">
                        <h2 className="text-xl md:text-2xl font-playfair font-bold tracking-wide">
                          {dictionary.widgets.fresh_news}
                        </h2>
                      </div>

                      {/* Paginated News Grid */}
                      <div className="-mt-6 relative z-10">
                        <NewsSection page={page} basePath={`/${lang}`} tag={tagFilter} dictionary={dictionary} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full animate-in fade-in duration-300">
                      {/* Events Header Block */}
                      <div className="bg-[#862633] text-white pt-5 pb-10 px-6 md:px-8 -mx-6 md:-mx-8 relative z-0">
                        <h2 className="text-xl md:text-2xl font-playfair font-bold tracking-wide">
                          {dictionary.rendezvenyek.title}
                        </h2>
                      </div>

                      {/* Events List and Calendar Grid */}
                      <div className="-mt-6 relative z-10">
                        <EventsSection
                          lang={currentLang}
                          ehkEvents={ehkEvents}
                          calendarEvents={events}
                          dictionary={dictionary}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </LanguageProvider>
  );
}
