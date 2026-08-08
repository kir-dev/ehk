import type { ContentBlock } from "@/components/common/ContentBlocks";

export type HousingLinkKey = "kefir";

export interface HousingLink {
  label: string;
  link: HousingLinkKey;
}

/** One expandable question on the page. */
export interface HousingFaqEntry {
  id: string;
  question: string;
  blocks: ContentBlock[];
}

export interface Housing {
  title: string;
  important_links: string;
  links: HousingLink[];
  faq: HousingFaqEntry[];
}
