export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getClubs } from "@/lib/payload-cms";
import { Club, Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { ClubCard } from "./components/ClubCard";
import { ClubsEmptyState } from "./components/ClubsEmptyState";

export default async function KlubokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const [pageDict, clubs] = await Promise.all([
    getDictionary(lang, "clubs"),
    getClubs(),
  ]);

  const d = pageDict.clubs;

  const labels = {
    nyitas: d.nyitas,
    helyszin: d.helyszin,
    link: d.link,
    leiras: d.leiras,
    gallery: d.gallery,
    prev_image: d.prev_image,
    next_image: d.next_image,
  };

  if (clubs.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f4f0]">
        <div className="container mx-auto px-2 md:px-4 py-8">
          <PageHeader title={d.title} subtitle={d.description} />
          <ClubsEmptyState title={d.no_results} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={d.title} subtitle={d.description} />

        <div className="bg-[#fffefc] border-b border-x border-[#e9e2d6] rounded-bl-2xl rounded-br-2xl p-6 md:p-8 flex flex-col gap-6">
          {clubs.map((club: Club) => {
            const coverImage =
              typeof club.image === "object" && club.image !== null
                ? (club.image as Media)
                : null;

            const openingHours = club.openingHours?.[`text_${lang}`] as
              | SerializedEditorState
              | null
              | undefined;

            const description = club.description?.[`text_${lang}`] as
              | SerializedEditorState
              | null
              | undefined;

            const galleryImages = (club.gallery ?? [])
              .map((item) =>
                typeof item.image === "object" && item.image !== null
                  ? (item.image as Media)
                  : null
              )
              .filter((img): img is Media => img !== null && !!img.url);

            return (
              <ClubCard
                key={club.id}
                title={club.title}
                coverImage={coverImage}
                openingHours={openingHours}
                location={club.location}
                link={club.link}
                description={description}
                galleryImages={galleryImages}
                labels={labels}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
