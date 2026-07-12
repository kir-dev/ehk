export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getDormitories } from "@/lib/payload-cms";
import { Media } from "@/payload-types";
import { ImageCard } from "@/components/common/ImageCard";

export default async function DormitoriesOverviewPage({
  params }: Readonly<{ params: Promise<{ lang: Locale }> }>){
  const { lang } = await params;
  const [dictionary, dormitories] = await Promise.all([
    getDictionary(lang, "dormitories"),
    getDormitories(),
  ]);

  const d = dictionary.dormitories.admission_information;

  const cards = dormitories
    .map((dormitory) => {
      const coverImage =
        typeof dormitory.coverImage === "object" && dormitory.coverImage !== null
          ? (dormitory.coverImage as Media)
          : null;

      if (!coverImage?.url) {
        return null;
      }

      return {
        name: dormitory.name,
        slug: dormitory.slug,
        imageSrc: coverImage.url,
        href:
          dormitory.externalLink ||
          `/${lang}/kollegium/kollegium-bemutato/${dormitory.slug}`,
      };
    })
    .filter((card): card is { name: string; slug: string; imageSrc: string; href: string } => card !== null);

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={d.introduction} />
        <div className="rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-6 md:p-8">
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map((dormitory) => (
                <ImageCard
                  key={dormitory.slug}
                  content={{
                    href: dormitory.href,
                    imageSrc: dormitory.imageSrc,
                    title: dormitory.name,
                    detailsLabel: d.details,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="font-open-sans text-sm leading-[1.6] text-[#6e6660]">
              {d.no_results}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
