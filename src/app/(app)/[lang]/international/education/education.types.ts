import type { ContentBlock } from "@/components/common/ContentBlocks";

export type EducationLinkKey = "neptun_requests" | "rules_and_regulations";

/** A red pill button pointing at one of the links in the constants file. */
export interface EducationAction {
  label: string;
  link: EducationLinkKey;
}

export interface EducationSection {
  title: string;
  blocks: ContentBlock[];
  actions?: EducationAction[];
}

export interface Education {
  title: string;
  sidebar: {
    text: string;
    action: EducationAction;
  };
  sections: EducationSection[];
}
