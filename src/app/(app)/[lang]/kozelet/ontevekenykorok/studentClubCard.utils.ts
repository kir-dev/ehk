import type { OrganizationCardProps } from "@/components/common/OrganizationCard";
import type { Locale } from "@/i18n-config";
import type { Media, StudentClub } from "@/payload-types";

export function localized(
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

export function getSocialLinks(
  contacts: StudentClub["contacts"],
): OrganizationCardProps["socialLinks"] {
  if (!contacts) return [];

  return [
    ["Website", contacts.websiteUrl],
    ["Facebook", contacts.facebookUrl],
    ["Instagram", contacts.instagramUrl],
    ["LinkedIn", contacts.linkedinUrl],
    ["YouTube", contacts.youtubeUrl],
    ["Email", contacts.email ? `mailto:${contacts.email}` : undefined],
  ]
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, url]) => ({ label, url }));
}

export function getGalleryImages(club: StudentClub) {
  return (
    club.gallery
      ?.map(({ image }) =>
        typeof image === "object" && image.url
          ? { src: image.url, alt: (image as Media).alt || club.name }
          : null,
      )
      .filter((image): image is { src: string; alt: string } => Boolean(image)) ??
    []
  );
}
