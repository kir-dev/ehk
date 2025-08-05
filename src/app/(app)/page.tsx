import NewsSection from "@/components/NewsSection";
import ImageViewer from "@/components/ImageViewer";
import {getHeroImages} from "@/lib/getHeroImages";

export default async function Home() {
    const heroImages = await getHeroImages();
  return (
      <div className="bg-transparent min-h-screen">
          <ImageViewer images={heroImages} />
          <NewsSection />
      </div>
  );
}
