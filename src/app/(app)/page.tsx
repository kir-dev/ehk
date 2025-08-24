import Link from "next/link";

export const dynamic = "force-dynamic";

import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import { getHeroImages } from "@/lib/getHeroImages";
import MUSZAKSection from "@/components/MUSZAKSection";
import HomeNewsHeader from "@/components/HomeNewsHeader";
import {getEvents} from "@/lib/payload-cms";
import Calendar from "@/components/Calendar";


export default async function Home() {
  const heroImages = await getHeroImages();
  const events = await getEvents();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="w-full">
          <div className="max-w-7xl mx-auto">
            <ImageViewer images={heroImages} />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="flex flex-row items-center mx-8 gap-x-8">
            <div className="col-span-1 flex justify-between flex-col gap-y-4 h-full min-w-[250px]">
              <div className="bg-white rounded-lg shadow-md flex flex-col relative p-4 flex-1">
                Fontos linkek:
                <ul className="list-disc list-inside">
                  <li>
                    <Link href="https://neptun.bme.hu" target="_blank">
                      Neptun
                    </Link>
                  </li>
                  <li>
                    <Link href="https://mueper.bme.hu" target="_blank">
                      Műeper
                    </Link>
                  </li>
                  <li>
                    <Link href="https://kefir.bme.hu" target="_blank">
                      Kefír
                    </Link>
                  </li>
                </ul>
              </div>
              <Calendar events={events} className="md:w-full h-2/3 mx-auto" />
            </div>
            <div className="flex-1">
                <HomeNewsHeader />
              <NewsSection />
            </div>
            <MUSZAKSection />
          </div>
        </section>
      </main>
    </div>
  );
}