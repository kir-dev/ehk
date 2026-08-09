import type { ContentBlock } from "@/components/common/ContentBlocks";

export type MobilityLinkKey =
  | "erasmus"
  | "eelisa"
  | "athens"
  | "ceepus"
  | "aiesec";

/** A red pill button pointing at one of the links in the constants file. */
export interface MobilityAction {
  label: string;
  link: MobilityLinkKey;
}

export interface MobilitySection {
  title: string;
  blocks: ContentBlock[];
  actions?: MobilityAction[];
}

export interface Mobility {
  title: string;
  intro: string;
  sections: MobilitySection[];
}
