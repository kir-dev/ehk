import type { OrganizationCardProps } from "@/components/common/OrganizationCard";
import type { Locale } from "@/i18n-config";
import type { CompetitiveTeam, Media } from "@/payload-types";

const statLabels = {
  hu: { foundedYear: "Alapítva", membersCount: "Létszám", faculties: "Verseny" },
  en: {
    foundedYear: "Founded",
    membersCount: "Members",
    faculties: "Competition",
  },
} as const;

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

export function getStats(
  team: CompetitiveTeam,
  locale: Locale,
): OrganizationCardProps["stats"] {
  const labels = statLabels[locale];
  const stats: NonNullable<OrganizationCardProps["stats"]>[number][] = [];

  if (team.stats?.foundedYear) {
    stats.push({
      label: labels.foundedYear,
      value: team.stats.foundedYear,
    });
  }
  if (team.stats?.membersCount) {
    stats.push({
      label: labels.membersCount,
      value: team.stats.membersCount,
    });
  }
  if (team.stats?.faculties) {
    stats.push({
      label: labels.faculties,
      value: team.stats.faculties,
    });
  }

  return stats;
}

export function getSocialLinks(
  contacts: CompetitiveTeam["contacts"],
): OrganizationCardProps["socialLinks"] {
  if (!contacts) return [];

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

export function getGalleryImages(team: CompetitiveTeam) {
  return (
    team.gallery
      ?.map(({ image }) =>
        typeof image === "object" && image.url
          ? { src: image.url, alt: (image as Media).alt || team.name }
          : null,
      )
      .filter((image): image is { src: string; alt: string } => Boolean(image)) ??
    []
  );
}

export function isUmbrellaOrganization(team: CompetitiveTeam) {
  return (
    team.name === "MVK" ||
    team.name.toLocaleLowerCase("hu").includes("versenycsapat közösség")
  );
}
