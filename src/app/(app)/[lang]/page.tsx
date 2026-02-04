export const dynamic = 'force-dynamic';

import Calendar from '@/app/(app)/components/Calendar';
import HomeNewsHeader from '@/app/(app)/components/HomeNewsHeader';
import ImageViewer from '@/app/(app)/components/ImageViewer';
import ImportantLinks from '@/app/(app)/components/ImportantLinks';
import MUSZAKSection from '@/app/(app)/components/MUSZAKSection';
import NewsSection from '@/app/(app)/components/NewsSection';
import { getHeroImages } from '@/lib/get-hero-images';
import { getEvents } from '@/lib/payload-cms';

// Home page: mobile 1 col, desktop 2 cols
export default async function Home({
  searchParams, params }: { searchParams?: Promise<Record<string, string | string[] | undefined>>, params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const heroImages = await getHeroImages(lang as 'hu' | 'en');

  const sp = await searchParams; // Next.js 15 dynamic API requires await
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const events = await getEvents();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero */}
      <main className="flex-grow">
        <section className="w-full">
          <div className="max-w-screen">
            <ImageViewer images={heroImages} />
          </div>
        </section>

        {/* Grid sections */}
        <section className="px-4 md:px-0 md:pr-4 pb-6 md:pb-0">
          <div className="max-w-[2200px] mx-auto">
            {/* Unique anchor for scrolling to the news section in all layouts */}
            <div id="hirek-section" className="h-0" aria-hidden />

            {/* Mobile: stacked layout */}
            <div className="block lg:hidden">
              <div className="flex flex-col gap-6">
                {/* Main news feed - first on mobile */}
                <div className="mt-6">
                  <HomeNewsHeader />
                  <NewsSection page={page} />
                </div>

                {/* Sidebar: Important links + Calendar + MUSZAK */}
                <div className="bg-ehk-links-bg p-4 rounded-lg">
                  <ImportantLinks />
                  <div className="w-full mt-4 min-w-0">
                    <Calendar events={events} className="w-full max-w-full h-auto" />
                  </div>
                  <div className="mt-4">
                    <MUSZAKSection />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 2-column grid layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8">
              {/* Left column: Important links + Calendar + MUSZAK */}
              <div className="lg:col-span-3 min-w-0">
                <div className="flex flex-col gap-y-4 bg-ehk-links-bg p-4">
                  <ImportantLinks />
                  <div className="w-full min-w-0">
                    <div className="max-w-full">
                      <Calendar events={events} className="w-full max-w-full h-auto [&_.rdp]:text-sm" />
                    </div>
                  </div>
                  <div>
                    <MUSZAKSection />
                  </div>
                </div>
              </div>

              {/* Right column: Main news feed */}
              <div className="lg:col-span-9 mt-6 min-w-0">
                <HomeNewsHeader />
                <NewsSection page={page} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
