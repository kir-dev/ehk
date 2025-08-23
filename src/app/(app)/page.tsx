import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import { getHeroImages } from "@/lib/getHeroImages";
import MUSZAKSection from "@/components/MUSZAKSection";
import { getEvents } from "@/lib/payload-cms";
import Calendar from "@/components/Calendar";
import Link from "next/link";

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-x-8 items-center mx-8">
            <div className="col-span-1 flex justify-between flex-col gap-y-4 h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative p-4 flex-1">
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
              <Calendar events={events} className="w-full h-2/3" />
            </div>
            <div className="max-w-7xl mx-auto col-span-1 sm:col-span-3">
              <h2 className="text-3xl font-bold mb-8 border-b-2 border-red-500 pb-2 inline-block">
                Hírek
              </h2>
              <NewsSection />
            </div>
            <MUSZAKSection />
          </div>
        </section>
      </main>
    </div>
  );
}
