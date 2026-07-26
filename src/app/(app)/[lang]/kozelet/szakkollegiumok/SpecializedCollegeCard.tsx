import {
  OrganizationCard,
  type OrganizationCardProps,
} from "@/components/common/OrganizationCard";
import type { Locale } from "@/i18n-config";
import type { Media, SpecializedCollege } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

const statLabels = {
  hu: {
    foundedYear: "Alapítva",
    membersCount: "Tagok",
    faculties: "Karok",
  },
  en: {
    foundedYear: "Founded",
    membersCount: "Members",
    faculties: "Faculties",
  },
} as const;

function localized(
  item: Record<string, unknown>,
  field: string,
  locale: Locale,
) {
  const primary = item[`${field}_${locale}`];
  const fallback = item[`${field}_${locale === "en" ? "hu" : "en"}`];

  return typeof primary === "string" && primary.trim()
    ? primary
    : typeof fallback === "string"
      ? fallback
      : "";
}

function getStats(
  college: SpecializedCollege,
  locale: Locale,
): OrganizationCardProps["stats"] {
  const labels = statLabels[locale];
  const stats: NonNullable<OrganizationCardProps["stats"]>[number][] = [];

  if (college.stats?.foundedYear) {
    stats.push({
      label: labels.foundedYear,
      value: college.stats.foundedYear,
    });
  }
  if (college.stats?.membersCount) {
    stats.push({
      label: labels.membersCount,
      value: college.stats.membersCount,
    });
  }
  if (college.stats?.faculties) {
    stats.push({
      label: labels.faculties,
      value: college.stats.faculties,
    });
  }

  return stats;
}

function getSocialLinks(
  contacts: SpecializedCollege["contacts"],
): OrganizationCardProps["socialLinks"] {
  if (!contacts) {
    return [];
  }

  return [
    ["Website", contacts.websiteUrl],
    ["Facebook", contacts.facebookUrl],
    ["Instagram", contacts.instagramUrl],
    ["LinkedIn", contacts.linkedinUrl],
    ["YouTube", contacts.youtubeUrl],
  ]
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, url]) => ({ label, url }));
}

function getGalleryImages(college: SpecializedCollege) {
  return (
    college.gallery
      ?.map(({ image }) =>
        typeof image === "object" && image.url
          ? {
              src: image.url,
              alt: (image as Media).alt || college.name,
            }
          : null,
      )
      .filter((image): image is { src: string; alt: string } => Boolean(image)) ??
    []
  );
}

export function SpecializedCollegeCard({
  college,
  locale,
}: Readonly<{ college: SpecializedCollege; locale: Locale }>) {
  const presentation =
    locale === "en" ? college.presentation_en : college.presentation_hu;
  const targetAudience =
    locale === "en"
      ? college.targetAudience_en || college.targetAudience_hu
      : college.targetAudience_hu || college.targetAudience_en;

  return (
    <OrganizationCard
      name={college.name}
      stats={getStats(college, locale)}
      presentation={<RichText data={presentation} />}
      events={college.events?.map((event) => ({
        title: localized(event, "eventName", locale),
        description: localized(event, "frequency", locale),
      }))}
      activities={college.activities?.map((item) =>
        localized(item, "text", locale),
      )}
      departments={college.departments?.map((item) =>
        localized(item, "text", locale),
      )}
      targetAudience={
        targetAudience ? <RichText data={targetAudience} /> : undefined
      }
      socialLinks={getSocialLinks(college.contacts)}
      galleryImages={getGalleryImages(college)}
      joinUrl={college.joinUrl ?? undefined}
      locale={locale}
      className="rounded-2xl shadow-none"
    />
  );
}
