export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { i18n, Locale } from "@/i18n-config";
import { getDormitoryBySlug } from "@/lib/payload-cms";
import type { Dormitory, Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import {
  BedDouble,
  ExternalLink,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const labels = {
  hu: {
    back: "Vissza",
    description: "Leírás",
    gallery: "Galéria",
    noDescription: "Ehhez a kollégiumhoz még nincs feltöltve leírás.",
    noGallery: "Ehhez a kollégiumhoz még nincs feltöltve galéria.",
    capacity: "FÉRŐHELYEK",
    address: "CÍM",
    roomInfo: "SZOBÁK",
    targetAudience: "KIK KAPHATNAK ITT HELYET?",
    website: "WEBOLDAL",
  },
  en: {
    back: "Back",
    description: "Description",
    gallery: "Gallery",
    noDescription: "No description has been uploaded for this dormitory yet.",
    noGallery: "No gallery has been uploaded for this dormitory yet.",
    capacity: "CAPACITY",
    address: "ADDRESS",
    roomInfo: "ROOMS",
    targetAudience: "WHO CAN GET A PLACE HERE?",
    website: "WEBSITE",
  },
} as const;

const hasRichText = (data: unknown): data is SerializedEditorState => {
  return Boolean(data && typeof data === "object" && "root" in data);
};

const getLocalizedText = (
  item: object,
  field: string,
  locale: Locale,
) => {
  const source = item as Record<string, unknown>;
  const primary = source[`${field}_${locale}`];
  const fallback = source[`${field}_${locale === "en" ? "hu" : "en"}`];

  return typeof primary === "string" && primary.trim()
    ? primary
    : typeof fallback === "string" && fallback.trim()
      ? fallback
      : "";
};

const getLocalizedRichText = (dormitory: Dormitory, locale: Locale) => {
  const primary = dormitory[`description_${locale}` as keyof Dormitory];
  const fallback =
    dormitory[`description_${locale === "en" ? "hu" : "en"}` as keyof Dormitory];

  if (hasRichText(primary)) {
    return primary;
  }

  return hasRichText(fallback) ? fallback : null;
};

const getMedia = (image: number | Media | null | undefined) => {
  return typeof image === "object" && image !== null ? image : null;
};

export default async function DormitoryDetailsPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale; slug: string }> }>) {
  const { lang, slug } = await params;
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const t = labels[validLang];
  const dormitory = await getDormitoryBySlug(slug);

  if (!dormitory) {
    notFound();
  }

  const description = getLocalizedRichText(dormitory, validLang);
  const gallery =
    dormitory.gallery
      ?.map((category) => ({
        id: category.id,
        name: getLocalizedText(category, "categoryName", validLang),
        images:
          category.images
            ?.map((entry) => getMedia(entry.image))
            .filter((image): image is Media => Boolean(image?.url)) ?? [],
      }))
      .filter((category) => category.images.length > 0) ?? [];

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <PageHeader
          title={dormitory.name}
          backHref={`/${validLang}/kollegium/kollegium-bemutato`}
          backLabel={t.back}
        />

        <section className="rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_343px] lg:items-start">
            <main className="min-w-0 space-y-8">
              <section>
                <h2 className="font-playfair text-2xl font-bold leading-tight text-[#1f1a18]">
                  {t.description}
                </h2>
                <div className="mt-4 rounded-lg border border-[#e9e2d6] bg-white p-4 md:p-6">
                  {description ? (
                    <div className="richtext max-w-none font-open-sans text-sm leading-[1.7] text-[#2f2a27] md:text-base">
                      <RichText data={description} />
                    </div>
                  ) : (
                    <p className="font-open-sans text-sm leading-[1.6] text-[#6e6660]">
                      {t.noDescription}
                    </p>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-playfair text-2xl font-bold leading-tight text-[#1f1a18]">
                    {t.gallery}
                  </h2>
                  {gallery.length > 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-[#e9e2d6] md:block"
                    />
                  )}
                </div>

                {gallery.length > 0 ? (
                  <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-3 md:-mx-8 md:px-8">
                    <div className="flex snap-x gap-4">
                      {gallery.map((category, index) => (
                        <article
                          key={category.id ?? `${category.name}-${index}`}
                          className="min-w-[min(88vw,520px)] snap-start rounded-lg border border-[#e9e2d6] bg-white p-3 shadow-sm md:p-4"
                        >
                          <h3 className="font-open-sans text-sm font-bold uppercase leading-tight tracking-[0.08em] text-[#862633]">
                            {category.name || t.gallery}
                          </h3>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            {category.images.map((image, imageIndex) => (
                              <figure
                                key={image.id ?? `${category.name}-${imageIndex}`}
                                className="overflow-hidden rounded-md bg-[#f9f4f0]"
                              >
                                <img
                                  src={image.url ?? ""}
                                  alt={
                                    image.alt ||
                                    `${dormitory.name} ${category.name} ${imageIndex + 1}`
                                  }
                                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                  loading="lazy"
                                />
                              </figure>
                            ))}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg border border-dashed border-[#e9e2d6] bg-white p-6 text-center font-open-sans text-sm text-[#6e6660]">
                    {t.noGallery}
                  </div>
                )}
              </section>
            </main>

            <DormitorySidebar dormitory={dormitory} locale={validLang} />
          </div>
        </section>
      </div>
    </div>
  );
}

function DormitorySidebar({
  dormitory,
  locale,
}: {
  dormitory: Dormitory;
  locale: Locale;
}) {
  const t = labels[locale];
  const address = getLocalizedText(dormitory, "address", locale);
  const roomInfo = getLocalizedText(dormitory, "roomInfo", locale);
  const targetAudience = getLocalizedText(dormitory, "targetAudience", locale);
  const items = [
    dormitory.capacity
      ? {
          icon: Users,
          label: t.capacity,
          value: String(dormitory.capacity),
        }
      : null,
    address
      ? {
          icon: MapPin,
          label: t.address,
          value: address,
          href: dormitory.mapUrl || undefined,
        }
      : null,
    roomInfo
      ? {
          icon: BedDouble,
          label: t.roomInfo,
          value: roomInfo,
        }
      : null,
    targetAudience
      ? {
          icon: GraduationCap,
          label: t.targetAudience,
          value: targetAudience,
        }
      : null,
  ].filter(Boolean);

  return (
    <aside className="rounded-2xl border border-[#e9e2d6] bg-white p-4 shadow-sm lg:sticky lg:top-24">
      <div className="space-y-4">
        {items.map((item) => {
          if (!item) {
            return null;
          }

          const Icon = item.icon;
          const content = (
            <>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f9f4f0] text-[#862633]">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-open-sans text-[12px] font-bold uppercase leading-tight tracking-[0.08em] text-[#8a817a]">
                  {item.label}
                </span>
                <span className="mt-1 block font-open-sans text-sm font-semibold leading-snug text-[#1f1a18]">
                  {item.value}
                </span>
              </span>
            </>
          );

          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 rounded-lg border border-[#e9e2d6] p-3 transition-colors hover:border-[#862633]/40 hover:bg-[#f9f4f0]"
            >
              {content}
            </Link>
          ) : (
            <div key={item.label} className="flex gap-3 rounded-lg border border-[#e9e2d6] p-3">
              {content}
            </div>
          );
        })}

        {dormitory.externalLink && (
          <div className="space-y-2">
            <h2 className="font-open-sans text-[12px] font-bold uppercase leading-tight tracking-[0.08em] text-[#8a817a]">
              {t.website}
            </h2>
            <Button
              asChild
              className="h-auto min-h-10 w-full rounded-full bg-[#862633] px-4 py-2 font-open-sans text-sm font-bold text-white hover:bg-[#9e2d3e]"
            >
              <Link
                href={dormitory.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{dormitory.name}</span>
                <ExternalLink className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
