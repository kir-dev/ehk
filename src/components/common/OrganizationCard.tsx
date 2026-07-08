import {
  ContactsSection,
  DepartmentsSection,
  EventsSection,
  GallerySection,
  InlineListSection,
  JoinCta,
  OrganizationCardHeader,
  PresentationSection,
  RichTextSection,
} from "@/components/common/organization-card/sections";
import type { OrganizationCardProps } from "@/components/common/organization-card/types";
import { getOrganizationCardLabels } from "@/components/common/organization-card/utils";
import { getSocialPriority } from "@/lib/social-utils";
import { cn } from "@/lib/utils";

export type {
  OrganizationCardLabels,
  OrganizationCardProps,
  OrganizationEvent,
  OrganizationGalleryImage,
  OrganizationSocialLink,
  OrganizationStat,
} from "@/components/common/organization-card/types";

export function OrganizationCard({
  name,
  stats,
  presentation,
  events,
  activities,
  departments,
  targetAudience,
  socialLinks,
  galleryImages,
  imageBasePath = "",
  joinUrl,
  joinText,
  labels,
  locale = "hu",
  className,
}: Readonly<OrganizationCardProps>) {
  const sectionLabels = { ...getOrganizationCardLabels(locale), ...labels };
  const sortedSocialLinks = socialLinks
    ? [...socialLinks].sort(
        (a, b) => getSocialPriority(a.label) - getSocialPriority(b.label),
      )
    : [];

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-white shadow-sm",
        className,
      )}
    >
      <OrganizationCardHeader name={name} stats={stats} />

      <div className="space-y-7 px-5 pb-7 sm:px-7 md:px-8 md:pb-8">
        <PresentationSection
          title={sectionLabels.presentation}
          content={presentation}
        />
        <EventsSection title={sectionLabels.events} events={events} />
        <InlineListSection
          title={sectionLabels.activities}
          items={activities}
        />
        <DepartmentsSection
          title={sectionLabels.departments}
          departments={departments}
        />
        <RichTextSection
          title={sectionLabels.targetAudience}
          content={targetAudience}
        />
        <ContactsSection
          title={sectionLabels.contacts}
          links={sortedSocialLinks}
          locale={locale}
        />
        <GallerySection
          title={sectionLabels.gallery}
          images={galleryImages}
          imageBasePath={imageBasePath}
          organizationName={name}
        />
      </div>

      <JoinCta href={joinUrl}>{joinText ?? sectionLabels.join}</JoinCta>
    </article>
  );
}
