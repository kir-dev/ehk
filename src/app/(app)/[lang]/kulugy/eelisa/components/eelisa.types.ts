import type { EelisaPage } from "@/payload-types";

export type PartnerUniversity = NonNullable<
  EelisaPage["partnerUniversities"]
>[number];

export type SidebarLink = NonNullable<EelisaPage["sidebarLinks"]>[number];

export type SidebarContact = NonNullable<
  EelisaPage["sidebarContacts"]
>[number];

export interface ApplicationLink {
  label: string;
  url: string;
}

export interface ApplicationStep {
  description: string;
  links_title?: string;
  links: ApplicationLink[];
}

export interface EelisaStaticContent {
  title: string;
  what_is_it: {
    title: string;
  };
  partners: {
    title: string;
  };
  how_to_apply: {
    title: string;
    steps: ApplicationStep[];
  };
  sidebar: {
    links_title: string;
    contacts_title: string;
  };
}
