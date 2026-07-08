import Image from "next/image";
import React from "react";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

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
  join: string;
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
        join: "Csatlakozom!",
      }
    : {
        presentation: "Presentation",
        events: "Featured events",
        activities: "Activities",
        departments: "Departments",
        targetAudience: "Who is it for?",
        contacts: "Contact",
        gallery: "Gallery",
        join: "Join us",
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

function getStatLabel(label: string) {
  return label.replace(/:$/, "");
}

function Section({
  title,
  children,
  className,
  bordered = true,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}>) {
  return (
    <section
      className={cn(
        "space-y-4",
        bordered && "border-t border-border pt-6 md:pt-7",
        className,
      )}
    >
      <h3 className="text-xs font-bold uppercase tracking-normal text-ehk-dark-red">
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
  const ctaText = joinText ?? sectionLabels.join;
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
  const hasJoinCta = Boolean(joinUrl);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-white shadow-sm",
        className,
      )}
    >
      <div className="px-5 pb-5 pt-6 sm:px-7 md:px-8 md:pb-6 md:pt-7">
        <div className="space-y-3">
          <h2 className="font-playfair text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {name}
          </h2>

          {hasStats && (
            <dl className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
              {stats?.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="flex items-center gap-2 sm:after:mx-4 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-ehk-light-red sm:last:after:hidden"
                >
                  <dt className="font-semibold text-muted-foreground">
                    {getStatLabel(stat.label)}:
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <div className="space-y-7 px-5 pb-7 sm:px-7 md:px-8 md:pb-8">
        {presentation && (
          <Section title={sectionLabels.presentation} bordered={false}>
            <div className="richtext text-sm leading-7 text-foreground/85 sm:text-base">
              {renderTextContent(presentation)}
            </div>
          </Section>
        )}

        {hasEvents && (
          <Section title={sectionLabels.events}>
            <div className="grid gap-3 md:grid-cols-2">
              {events?.map((event) => {
                const eventContent = (
                  <div className="h-full rounded-lg border border-border bg-muted/35 p-4 transition-colors hover:border-ehk-light-red/40 hover:bg-white">
                    <h4 className="font-semibold text-foreground">
                      {event.title}
                    </h4>
                    {event.description && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {parseFormattedText(event.description)}
                      </p>
                    )}
                    {(event.date || event.location) && (
                      <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:flex-wrap">
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
                    className="block h-full"
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
            <ul className="flex flex-col gap-2 text-sm font-semibold text-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
              {activities?.map((activity, index) => (
                <li
                  key={`${activity}-${index}`}
                  className="flex items-center gap-2 sm:after:mx-4 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-ehk-light-red sm:last:after:hidden"
                >
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
                  className="rounded-full border border-ehk-light-red/20 bg-ehk-light-red/5 px-3.5 py-1.5 text-sm font-semibold text-foreground"
                >
                  {department}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {hasTargetAudience && (
          <Section title={sectionLabels.targetAudience}>
            <div className="richtext text-sm leading-7 text-foreground/85 sm:text-base">
              {renderTextContent(targetAudience)}
            </div>
          </Section>
        )}

        {hasSocialLinks && (
          <Section title={sectionLabels.contacts}>
            <div className="flex flex-wrap gap-2.5">
              {sortedSocialLinks.map((link) => (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialName(link.label, locale)}
                  title={getSocialName(link.label, locale)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-ehk-light-red/5 hover:text-ehk-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red"
                >
                  {getSocialIcon(link.label, "h-5 w-5")}
                </a>
              ))}
            </div>
          </Section>
        )}

        {hasGallery && (
          <Section title={sectionLabels.gallery}>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7 md:-mx-8 md:px-8">
              {galleryImages?.map((image, index) => (
                <div
                  key={`${resolveImageSrc(image, imageBasePath)}-${index}`}
                  className="relative aspect-[4/3] w-[min(78vw,320px)] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-muted sm:w-80"
                >
                  <Image
                    src={resolveImageSrc(image, imageBasePath)}
                    alt={getImageAlt(image, name, index)}
                    fill
                    sizes="(max-width: 640px) 78vw, 320px"
                    className="object-cover"
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
          className="group flex items-center justify-between gap-4 bg-ehk-dark-red px-5 py-4 text-white transition-colors hover:bg-ehk-light-red sm:px-7 md:px-8"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Users className="h-4 w-4" />
            {ctaText}
          </span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </article>
  );
}
