export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getEhkEvents } from "@/lib/payload-cms";
import { EhkEvent, Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { PartyPopper } from "lucide-react";
import { EventCard } from "./components/EventCard";

export default async function RendezvenyekPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const [dictionary, events] = await Promise.all([
    getDictionary(lang, "news"),
    getEhkEvents(),
  ]);

  const d = dictionary.rendezvenyek;

  const labels = {
    leiras: d.description_label,
    gallery: d.gallery,
    links: d.links_label,
    prev_image: d.prev_image,
    next_image: d.next_image,
  };

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f4f0]">
        <div className="container mx-auto px-2 md:px-4 py-8">
          <PageHeader title={d.title} subtitle={d.description} />
          <EmptyState title={d.no_results} icon={PartyPopper} iconClassName="text-ehk-dark-red" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={d.title} subtitle={d.description} />

        <div className="bg-[#fffefc] border-b border-x border-[#e9e2d6] rounded-bl-2xl rounded-br-2xl p-6 md:p-8 flex flex-col gap-6">
          {events.map((event: EhkEvent) => {
            const coverImage =
              typeof event.coverImage === "object" && event.coverImage !== null
                ? (event.coverImage as Media)
                : null;

            const description = event.description?.[`text_${lang}`] as
              | SerializedEditorState
              | null
              | undefined;

            const galleryImages = (event.gallery ?? [])
              .map((item) =>
                typeof item.image === "object" && item.image !== null
                  ? (item.image as Media)
                  : null
              )
              .filter((img): img is Media => img !== null && !!img.url);

            const links = (event.links ?? []).map((link) => ({
              label: link.label,
              url: link.url,
            }));

            return (
              <EventCard
                key={event.id}
                title={event.title}
                coverImage={coverImage}
                description={description}
                galleryImages={galleryImages}
                links={links}
                lang={lang}
                labels={labels}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
