import Image from "next/image";
import React from "react";
import {
  ArrowRight,
  CalendarDays,
  CircleDot,
  MapPin,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import {
  getSocialIcon,
  getSocialName,
  getSocialPriority,
} from "@/lib/social-utils";
import { parseFormattedText } from "@/utils/parseFormattedText";

type TextContent = string | readonly string[] | React.ReactNode;

export type OrganizationStat = {
  label: string;
  value: string | number;
};

export type OrganizationEvent = {
  title: string;
  description?: string;
  date?: string;
  location?: string;
  href?: string;
};

export type OrganizationGalleryImage =
  | string
  | {
      src: string;
      alt?: string;
    };

export type OrganizationSocialLink = {
  label: string;
  url: string;
};

type OrganizationCardLabels = {
  presentation: string;
  events: string;
  activities: string;
  departments: string;
  targetAudience: string;
  contacts: string;
  gallery: string;
};

export type OrganizationCardProps = {
  name: string;
  stats?: readonly OrganizationStat[];
  presentation?: TextContent;
  events?: readonly OrganizationEvent[];
  activities?: readonly string[];
  departments?: readonly string[];
  targetAudience?: TextContent;
  socialLinks?: readonly OrganizationSocialLink[];
  galleryImages?: readonly OrganizationGalleryImage[];
  imageBasePath?: string;
  joinUrl?: string;
  joinText?: string;
  labels?: Partial<OrganizationCardLabels>;
  locale?: Locale;
  className?: string;
};

const defaultLabels = (locale: Locale): OrganizationCardLabels =>
  locale === "hu"
    ? {
        presentation: "Bemutatás",
        events: "Kiemelt események",
        activities: "Tevékenységek",
        departments: "Tagozatok",
        targetAudience: "Kinek ajánljuk?",
        contacts: "Elérhetőségek",
        gallery: "Galéria",
      }
    : {
        presentation: "Presentation",
        events: "Featured events",
        activities: "Activities",
        departments: "Departments",
        targetAudience: "Who is it for?",
        contacts: "Contact",
        gallery: "Gallery",
      };

function renderTextContent(content: TextContent) {
  if (Array.isArray(content)) {
    return (
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={`${paragraph.slice(0, 28)}-${index}`}>
            {parseFormattedText(paragraph)}
          </p>
        ))}
      </div>
    );
  }

  if (typeof content === "string") {
    return <p>{parseFormattedText(content)}</p>;
  }

  return content;
}

function resolveImageSrc(image: OrganizationGalleryImage, imageBasePath: string) {
  const source = typeof image === "string" ? image : image.src;
  if (source.startsWith("/") || source.startsWith("http")) {
    return source;
  }

  return `${imageBasePath}/${source}`;
}

function getImageAlt(
  image: OrganizationGalleryImage,
  organizationName: string,
  index: number,
) {
  if (typeof image !== "string" && image.alt) {
    return image.alt;
  }

  return `${organizationName} - ${index + 1}`;
}

function Section({
  title,
  children,
  className,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn("space-y-4", className)}>
      <h3 className="text-xs font-bold uppercase tracking-normal text-[#862633]">
        {title}
      </h3>
      {children}
    </section>
  );
}

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
  const sectionLabels = { ...defaultLabels(locale), ...labels };
  const sortedSocialLinks = socialLinks
    ? [...socialLinks].sort(
        (a, b) => getSocialPriority(a.label) - getSocialPriority(b.label),
      )
    : [];

  const hasStats = Boolean(stats?.length);
  const hasEvents = Boolean(events?.length);
  const hasActivities = Boolean(activities?.length);
  const hasDepartments = Boolean(departments?.length);
  const hasTargetAudience = Boolean(targetAudience);
  const hasSocialLinks = sortedSocialLinks.length > 0;
  const hasGallery = Boolean(galleryImages?.length);
  const hasJoinCta = Boolean(joinUrl && joinText);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-[#eadfe1] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <div className="border-b border-[#eadfe1] bg-[#fbf8f7] px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-playfair text-2xl font-semibold leading-tight text-[#24201f] sm:text-3xl">
            {name}
          </h2>

          {hasStats && (
            <dl className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
              {stats?.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-md border border-[#eadfe1] bg-white px-4 py-3"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-normal text-[#7b7170]">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#862633]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <div className="space-y-8 px-5 py-6 sm:px-7">
        {presentation && (
          <Section title={sectionLabels.presentation}>
            <div className="richtext text-sm leading-7 text-[#4b4545] sm:text-base">
              {renderTextContent(presentation)}
            </div>
          </Section>
        )}

        {hasEvents && (
          <Section title={sectionLabels.events}>
            <div className="grid gap-3 md:grid-cols-2">
              {events?.map((event) => {
                const eventContent = (
                  <div className="h-full rounded-md border border-[#eadfe1] bg-[#fbf8f7] p-4 transition-colors hover:border-[#d7b8be]">
                    <h4 className="font-semibold text-[#24201f]">
                      {event.title}
                    </h4>
                    {event.description && (
                      <p className="mt-2 text-sm leading-6 text-[#625a59]">
                        {parseFormattedText(event.description)}
                      </p>
                    )}
                    {(event.date || event.location) && (
                      <div className="mt-3 flex flex-col gap-2 text-xs text-[#7b7170] sm:flex-row sm:flex-wrap">
                        {event.date && (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {event.date}
                          </span>
                        )}
                        {event.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );

                return event.href ? (
                  <a
                    key={`${event.title}-${event.href}`}
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventContent}
                  </a>
                ) : (
                  <div key={event.title}>{eventContent}</div>
                );
              })}
            </div>
          </Section>
        )}

        {hasActivities && (
          <Section title={sectionLabels.activities}>
            <ul className="flex flex-col gap-2 text-sm font-medium text-[#34302f] sm:flex-row sm:flex-wrap sm:items-center">
              {activities?.map((activity, index) => (
                <li
                  key={`${activity}-${index}`}
                  className="flex items-center gap-2"
                >
                  {index > 0 && (
                    <CircleDot className="hidden h-3 w-3 text-[#b2293b] sm:block" />
                  )}
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {hasDepartments && (
          <Section title={sectionLabels.departments}>
            <ul className="flex flex-wrap gap-2">
              {departments?.map((department) => (
                <li
                  key={department}
                  className="rounded-full border border-[#eadfe1] bg-[#fbf8f7] px-3 py-1.5 text-sm font-medium text-[#34302f]"
                >
                  {department}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {hasTargetAudience && (
          <Section title={sectionLabels.targetAudience}>
            <div className="rounded-md border border-[#eadfe1] bg-[#fbf8f7] p-4 text-sm leading-7 text-[#4b4545] sm:text-base">
              <div className="richtext">{renderTextContent(targetAudience)}</div>
            </div>
          </Section>
        )}

        {hasSocialLinks && (
          <Section title={sectionLabels.contacts}>
            <div className="flex flex-wrap gap-3">
              {sortedSocialLinks.map((link) => (
                <Button
                  key={`${link.label}-${link.url}`}
                  variant="outline"
                  className="h-10 rounded-full border-[#eadfe1] bg-white px-4 text-[#34302f] hover:border-[#d7b8be] hover:bg-[#fbf8f7] hover:text-[#862633]"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {getSocialIcon(link.label)}
                    {getSocialName(link.label, locale)}
                  </a>
                </Button>
              ))}
            </div>
          </Section>
        )}

        {hasGallery && (
          <Section title={sectionLabels.gallery}>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7">
              {galleryImages?.map((image, index) => (
                <div
                  key={`${resolveImageSrc(image, imageBasePath)}-${index}`}
                  className="relative aspect-[4/3] w-[min(78vw,320px)] shrink-0 snap-start overflow-hidden rounded-md border border-[#eadfe1] bg-[#f7f3f1] sm:w-80"
                >
                  <Image
                    src={resolveImageSrc(image, imageBasePath)}
                    alt={getImageAlt(image, name, index)}
                    fill
                    sizes="(max-width: 640px) 78vw, 320px"
                    className="object-contain p-3"
                  />
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {hasJoinCta && (
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 bg-[#862633] px-5 py-4 text-white transition-colors hover:bg-[#721f2b] sm:px-7"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Users className="h-4 w-4" />
            {joinText}
          </span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </article>
  );
}
