export const dynamic = 'force-dynamic';

import ImageViewer from '@/components/ImageViewer';
import { getHeroImages } from '@/lib/getHeroImages';
import { getEvents } from '@/lib/payload-cms';
import Calendar from '@/components/Calendar';
import ImportantLinks from '@/components/ImportantLinks';
import HomeNewsHeader from '@/components/HomeNewsHeader';
import NewsSection from '@/components/NewsSection';
import MUSZAKSection from '@/components/MUSZAKSection';

// Home page: mobile 1 col, desktop 2 cols
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
            <div className="block lg:hidden">
              <div className="flex flex-col gap-6">
                {/* Main news feed - first on mobile */}
                <div>
                  <HomeNewsHeader />
                  <NewsSection page={page} />
                </div>

                {/* Sidebar: Important links + Calendar + MUSZAK */}
                <div>
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
                <div className="flex flex-col gap-y-4">
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
              <div className="lg:col-span-9 min-w-0">
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
