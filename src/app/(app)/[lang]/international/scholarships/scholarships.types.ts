import type { ContentBlock } from "@/components/common/ContentBlocks";

export type ScholarshipsLinkKey =
  | "mueper"
  | "eszb"
  | "grants_email"
  | "social_email";

/** A pill button pointing at one of the links in the constants file. */
export interface ScholarshipsAction {
  label: string;
  link: ScholarshipsLinkKey;
}

export interface ScholarshipsSection {
  title: string;
  blocks: ContentBlock[];
  actions?: ScholarshipsAction[];
}

export interface Scholarships {
  title: string;
  intro: string;
  important_links: string;
  contact_title: string;
  links: ScholarshipsAction[];
  contact_links: ScholarshipsAction[];
  sections: ScholarshipsSection[];
}
