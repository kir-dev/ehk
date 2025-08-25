export const dynamic = "force-dynamic";

import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import { getHeroImages } from "@/lib/getHeroImages";
import MUSZAKSection from "@/components/MUSZAKSection";
import HomeNewsHeader from "@/components/HomeNewsHeader";
import {getEvents} from "@/lib/payload-cms";
import Calendar from "@/components/Calendar";
import ImportantLinks from "@/components/ImportantLinks";


export default async function Home({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const heroImages = await getHeroImages();
  const events = await getEvents();

  const sp = await searchParams;
  const rawPageParam = sp?.page;
  const rawPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const currentPage = rawPage ? Number(rawPage) : 1;
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="w-full">
          <div className="max-w-screen mx-4">
            <ImageViewer images={heroImages} />
          </div>
        </section>

        <section className="px-4">
          <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Sidebar: Important links + Calendar */}
            <div className="order-2 md:order-1 md:col-span-4 lg:pt-19 lg:col-span-3 xl:col-span-2 flex flex-col gap-y-4 md:min-w-[250px] xl:min-w-0">
              <ImportantLinks />
              <Calendar events={events} className="w-full h-auto" />
            </div>

            {/* Main news feed */}
            <div className="order-1 md:order-2 md:col-span-8 lg:col-span-7 xl:col-span-8">
              <HomeNewsHeader />
              <NewsSection page={page} />
            </div>

            {/* MUSZAK section: below on md, right column on lg */}
            <div className="order-3 lg:pt-19 md:col-span-12 lg:col-span-2 xl:col-span-2">
              <MUSZAKSection />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}