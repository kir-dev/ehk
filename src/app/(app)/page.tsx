export const dynamic = 'force-dynamic';

import ImageViewer from '@/components/ImageViewer';
import { getHeroImages } from '@/lib/getHeroImages';
import { getEvents } from '@/lib/payload-cms';
import Calendar from '@/components/Calendar';
import ImportantLinks from '@/components/ImportantLinks';
import HomeNewsHeader from '@/components/HomeNewsHeader';
import NewsSection from '@/components/NewsSection';
import MUSZAKSection from '@/components/MUSZAKSection';

// Home page: mobile 1 col, lg 3 cols, xl 5 cols.
export default async function Home({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const heroImages = await getHeroImages();

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
          <div className="max-w-screen mx-4">
            <ImageViewer images={heroImages} />
          </div>
        </section>

        {/* Grid sections */}
        <section className="px-4 py-6">
          <div className="max-w-[1800px] mx-auto">
            {/* Mobile: stacked layout */}
            <div className="block md:hidden">
              <div className="flex flex-col gap-6">
                {/* Main news feed - first on mobile */}
                <div>
                  <HomeNewsHeader />
                  <NewsSection page={page} />
                </div>

                {/* Sidebar: Important links + Calendar */}
                <div>
                  <ImportantLinks />
                  <div className="w-full overflow-hidden mt-4">
                    <Calendar events={events} className="w-full max-w-full h-auto" />
                  </div>
                </div>

                {/* MUSZAK section */}
                <div>
                  <MUSZAKSection />
                </div>
              </div>
            </div>

            {/* Medium screens: news in 3 columns, then sidebar and muszak below */}
            <div className="hidden md:block xl:hidden">
              <div className="flex flex-col gap-8">
                {/* News section - full width, 3 columns */}
                <div>
                  <HomeNewsHeader />
                  <NewsSection page={page} />
                </div>

                {/* Bottom row: Important links + Calendar | MUSZAK */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Sidebar: Important links + Calendar */}
                  <div className="min-w-0">
                    <ImportantLinks />
                    <div className="w-full overflow-hidden mt-4">
                      <div className="max-w-full">
                        <Calendar events={events} className="w-full max-w-full h-auto [&_.rdp]:text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* MUSZAK section */}
                  <div className="min-w-0">
                    <MUSZAKSection />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 3-column grid layout */}
            <div className="hidden xl:grid xl:grid-cols-12 gap-8">
              {/* Sidebar: Important links + Calendar */}
              <div className="xl:col-span-2 min-w-0">
                <div className="flex flex-col gap-y-4">
                  <ImportantLinks />
                  <div className="w-full overflow-hidden">
                    <div className="max-w-full">
                      <Calendar events={events} className="w-full max-w-full h-auto [&_.rdp]:text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main news feed */}
              <div className="xl:col-span-8 min-w-0">
                <HomeNewsHeader />
                <NewsSection page={page} />
              </div>

              {/* MUSZAK section */}
              <div className="xl:col-span-2 min-w-0">
                <MUSZAKSection />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

