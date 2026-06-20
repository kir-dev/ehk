import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { getSocialScholarshipsFAQ } from "@/lib/payload-cms";
import type { SocialScholarshipsFaq } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type ScholarshipType = NonNullable<
  SocialScholarshipsFaq["scholarshipTypes"]
>[number];
type SidebarLink = NonNullable<SocialScholarshipsFaq["sidebarLinks"]>[number];

const hasRichText = (data: unknown): data is SerializedEditorState => {
  return Boolean(data && typeof data === "object" && "root" in data);
};

const getLocalizedTitle = (
  item: { title_hu?: string | null; title_en?: string | null },
  isEn: boolean,
) => {
  return isEn
    ? item.title_en || item.title_hu || ""
    : item.title_hu || item.title_en || "";
};

const getLocalizedRichText = (
  item: {
    targetAudience_hu?: unknown;
    targetAudience_en?: unknown;
    description_hu?: unknown;
    description_en?: unknown;
  },
  field: "targetAudience" | "description",
  isEn: boolean,
) => {
  const primary = item[`${field}_${isEn ? "en" : "hu"}`];
  const fallback = item[`${field}_${isEn ? "hu" : "en"}`];

  if (hasRichText(primary)) {
    return primary;
  }

  return hasRichText(fallback) ? fallback : null;
};

export default async function SocialScholarshipPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const isEn = validLang === "en";
  const dictionary = await getDictionary(validLang, "scholarships");
  const social = dictionary.scholarships.social;
  const { scholarshipTypes, sidebarLinks } = await getSocialScholarshipsFAQ();
  const items = scholarshipTypes ?? [];
  const links = sidebarLinks ?? [];

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_343px] lg:items-start">
          <main className="min-w-0">
            <PageHeader title={social.title} />
            <section className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
              {items.length === 0 ? (
                <EmptyState
                  title={social.empty_title}
                  description={social.empty_description}
                />
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <ScholarshipCard
                      key={item.id ?? `${item.title_hu}-${index}`}
                      item={item}
                      isEn={isEn}
                      targetAudienceLabel={social.target_audience_title}
                      actionLabel={social.eszb_website}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>

          {links.length > 0 && (
            <ImportantLinksSidebar
              links={links}
              isEn={isEn}
              title={social.sidebar_title}
              mueperDescription={social.sidebar_mueper_description}
              eszbDescription={social.sidebar_eszb_description}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ScholarshipCard({
  item,
  isEn,
  targetAudienceLabel,
  actionLabel,
}: {
  item: ScholarshipType;
  isEn: boolean;
  targetAudienceLabel: string;
  actionLabel: string;
}) {
  const title = getLocalizedTitle(item, isEn);
  const targetAudience = getLocalizedRichText(item, "targetAudience", isEn);
  const description = getLocalizedRichText(item, "description", isEn);

  return (
    <article className="rounded-lg border border-[#e9e2d6] bg-[#fffefc] p-4 md:p-6">
      <div className="flex flex-col gap-3 border-b border-[#e9e2d6] pb-4 md:flex-row md:items-start md:justify-between">
        <h2 className="font-open-sans text-base font-bold leading-snug text-[#1f1a18]">
          {title}
        </h2>
        {item.actionLink && (
          <Button
            asChild
            className="min-h-9 h-auto w-full justify-between whitespace-normal rounded-full bg-[#862633] px-4 py-2 text-left text-[12px] font-bold uppercase leading-tight tracking-normal text-white hover:bg-[#9e2d3e] md:w-auto md:justify-center"
          >
            <Link
              href={item.actionLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{actionLabel}</span>
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      {targetAudience && (
        <div className="pt-4">
          <h3 className="font-open-sans text-[13px] font-bold uppercase leading-none text-[#9a9a9a]">
            {targetAudienceLabel}
          </h3>
          <div className="richtext mt-3 max-w-none font-open-sans text-sm leading-[1.55] text-[#2f2a27]">
            <RichText data={targetAudience} />
          </div>
        </div>
      )}

      {description && (
        <div className="richtext mt-6 max-w-none font-open-sans text-sm leading-[1.6] text-[#2f2a27]">
          <RichText data={description} />
        </div>
      )}
    </article>
  );
}

function ImportantLinksSidebar({
  links,
  isEn,
  title,
  mueperDescription,
  eszbDescription,
}: {
  links: SidebarLink[];
  isEn: boolean;
  title: string;
  mueperDescription: string;
  eszbDescription: string;
}) {
  return (
    <aside className="rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 shadow-sm lg:sticky lg:top-24">
      <h2 className="font-open-sans text-[13px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#6e6660]">
        {title}
      </h2>
      <div className="mt-3 space-y-4">
        {links.map((link, index) => {
          const label = getLocalizedTitle(link, isEn);
          const description = getSidebarDescription(
            label,
            mueperDescription,
            eszbDescription,
          );

          return (
            <div key={link.id ?? `${label}-${index}`} className="space-y-2">
              {description && (
                <p className="font-open-sans text-sm leading-snug text-[#2f2a27]">
                  {description}
                </p>
              )}
              <Button
                asChild
                className="h-auto min-h-9 whitespace-normal rounded-full bg-[#862633] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#9e2d3e]"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <span>{label}</span>
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function getSidebarDescription(
  label: string,
  mueperDescription: string,
  eszbDescription: string,
) {
  const normalized = label.toLocaleLowerCase("hu-HU");

  if (normalized.includes("műeper") || normalized.includes("mueper")) {
    return mueperDescription;
  }

  if (normalized.includes("eszb")) {
    return eszbDescription;
  }

  return "";
}
