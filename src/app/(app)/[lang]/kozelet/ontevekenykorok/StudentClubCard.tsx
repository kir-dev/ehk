import { OrganizationCard } from "@/components/common/OrganizationCard";
import type { Locale } from "@/i18n-config";
import type { StudentClub } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

import {
  getGalleryImages,
  getSocialLinks,
  localized,
} from "./studentClubCard.utils";

export function StudentClubCard({
  club,
  locale,
}: Readonly<{ club: StudentClub; locale: Locale }>) {
  const targetAudience =
    locale === "en"
      ? club.targetAudience_en || club.targetAudience_hu
      : club.targetAudience_hu || club.targetAudience_en;
  const joinPrompt =
    locale === "en"
      ? club.joinText_en || club.joinText_hu
      : club.joinText_hu || club.joinText_en;

  return (
    <OrganizationCard
      name={club.name}
      presentation={
        <RichText
          data={locale === "en" ? club.presentation_en : club.presentation_hu}
        />
      }
      activities={club.activities?.map((item) =>
        localized(item, "text", locale),
      )}
      targetAudience={
        targetAudience ? <RichText data={targetAudience} /> : undefined
      }
      socialLinks={getSocialLinks(club.contacts)}
      galleryImages={getGalleryImages(club)}
      joinUrl={club.joinUrl ?? undefined}
      joinPrompt={joinPrompt ?? undefined}
      locale={locale}
      className="rounded-2xl shadow-none"
    />
  );
}
