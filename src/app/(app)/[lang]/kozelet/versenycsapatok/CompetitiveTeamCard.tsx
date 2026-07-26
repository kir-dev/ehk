import {
  OrganizationCard,
} from "@/components/common/OrganizationCard";
import type { Locale } from "@/i18n-config";
import type { CompetitiveTeam } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

import {
  getGalleryImages,
  getSocialLinks,
  getStats,
  isUmbrellaOrganization,
  localized,
} from "./competitiveTeamCard.utils";

const sectionLabels = {
  hu: {
    umbrellaEvents: "Versenyek",
    umbrellaTeams: "Tagcsapatok",
    teamEvents: "Projekt & eredmény",
  },
  en: {
    umbrellaEvents: "Competitions",
    umbrellaTeams: "Member teams",
    teamEvents: "Projects & results",
  },
} as const;

export function CompetitiveTeamCard({
  team,
  locale,
}: Readonly<{ team: CompetitiveTeam; locale: Locale }>) {
  const umbrella = isUmbrellaOrganization(team);
  const labels = sectionLabels[locale];
  const departments = team.departments?.map((item) =>
    localized(item, "text", locale),
  );
  const targetAudience =
    locale === "en"
      ? team.targetAudience_en || team.targetAudience_hu
      : team.targetAudience_hu || team.targetAudience_en;

  return (
    <OrganizationCard
      name={team.name}
      stats={getStats(team, locale)}
      presentation={
        <RichText
          data={locale === "en" ? team.presentation_en : team.presentation_hu}
        />
      }
      events={team.events?.map((event) => ({
        title: localized(event, "eventName", locale),
        description: localized(event, "frequency", locale),
      }))}
      activities={
        umbrella
          ? departments
          : team.activities?.map((item) => localized(item, "text", locale))
      }
      departments={umbrella ? undefined : departments}
      targetAudience={
        targetAudience ? <RichText data={targetAudience} /> : undefined
      }
      socialLinks={getSocialLinks(team.contacts)}
      galleryImages={getGalleryImages(team)}
      joinUrl={team.joinUrl ?? undefined}
      labels={{
        events: umbrella ? labels.umbrellaEvents : labels.teamEvents,
        ...(umbrella && { activities: labels.umbrellaTeams }),
      }}
      locale={locale}
      className="rounded-2xl shadow-none"
    />
  );
}
