import type { ReactNode } from "react";

import type { Locale } from "@/i18n-config";

export type TextContent = string | readonly string[] | ReactNode;

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

export type OrganizationCardLabels = {
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
