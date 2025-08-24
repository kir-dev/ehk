export const dynamic = "force-dynamic";

import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import { getHeroImages } from "@/lib/getHeroImages";
import MUSZAKSection from "@/components/MUSZAKSection";
import HomeNewsHeader from "@/components/HomeNewsHeader";

export default async function Home() {
    const heroImages = await getHeroImages();

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <main className="flex-grow">
                <section className="w-full">
                    <div className="max-w-7xl mx-auto">
                        <ImageViewer images={heroImages} />
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="max-w-7xl mx-auto col-span-1 sm:col-span-2">
                            <HomeNewsHeader />
                            <NewsSection />
                        </div>
                        <MUSZAKSection/>
                    </div>
                </section>
            </main>
        </div>
    );
}