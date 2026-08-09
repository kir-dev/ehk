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
import { AccordionItem } from "@/components/common/Accordion";
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
  joinPrompt,
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

  // Every section renders null when its input is missing, so without this the
  // mobile card would show a "Részletek" trigger that opens onto nothing.
  const hasDetails = Boolean(
    presentation ||
      events?.length ||
      activities?.length ||
      departments?.length ||
      targetAudience ||
      sortedSocialLinks.length ||
      galleryImages?.length,
  );

  const sections = (
    <>
      <PresentationSection
        title={sectionLabels.presentation}
        content={presentation}
      />
      <EventsSection title={sectionLabels.events} events={events} />
      <InlineListSection title={sectionLabels.activities} items={activities} />
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
        locale={locale}
      />
    </>
  );

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-[#fffefc]",
        className,
      )}
    >
      <OrganizationCardHeader name={name} stats={stats} />

      {hasDetails && (
        <>
          {/* Fully expanded these cards run ~1300px each, which turns a listing
              page into tens of screens on a phone. Collapse them below md. */}
          <AccordionItem
            className="rounded-none border-0 md:hidden"
            buttonClassName="px-4 py-3"
            contentClassName="space-y-4 px-4 pb-4"
            title={sectionLabels.details}
          >
            {sections}
          </AccordionItem>

          <div className="hidden space-y-4 p-4 md:block">{sections}</div>
        </>
      )}

      <JoinCta href={joinUrl} prompt={joinPrompt}>
        {joinText ?? sectionLabels.join}
      </JoinCta>
    </article>
  );
}
