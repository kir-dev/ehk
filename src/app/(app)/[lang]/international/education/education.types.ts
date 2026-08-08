export type EducationLinkKey = "neptun_requests" | "rules_and_regulations";

/** A red pill button pointing at one of the links in the constants file. */
export interface EducationAction {
  label: string;
  link: EducationLinkKey;
}

export interface EducationListItem {
  /** Bold lead-in, e.g. "Timeline". May stand alone above a nested list. */
  emphasis?: string;
  text?: string;
  /** Nested bullets rendered under this item. */
  items?: string[];
}

export type EducationBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: EducationListItem[] };

export interface EducationSection {
  title: string;
  blocks: EducationBlock[];
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
