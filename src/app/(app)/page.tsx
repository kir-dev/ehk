import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import { getHeroImages } from "@/lib/getHeroImages";
import MUSZAKSection from "@/components/MUSZAKSection";

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
                            <h2 className="text-3xl font-bold mb-8 border-b-2 border-red-500 pb-2 inline-block">Hírek</h2>
                            <NewsSection />
                        </div>
                        <MUSZAKSection/>
                    </div>
                </section>
            </main>
        </div>
    );
}