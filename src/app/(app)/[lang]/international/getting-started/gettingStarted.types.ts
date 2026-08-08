export type GettingStartedLinkKey =
  | "mobility"
  | "neptun"
  | "neptun_guides"
  | "newsletter"
  | "budapest_go"
  | "residence_permit"
  | "taj_card"
  | "student_id"
  | "kth"
  | "nki";

/** A red pill button pointing at one of the links in the constants file. */
export interface GettingStartedAction {
  label: string;
  link: GettingStartedLinkKey;
}

export interface GettingStartedListItem {
  /** Bold lead-in rendered before the text, e.g. "To register:". */
  emphasis?: string;
  text: string;
  /** Inline link rendered right after the text. */
  link?: GettingStartedLinkKey;
  link_label?: string;
  /** Text rendered after the inline link. */
  suffix?: string;
}

/** A labelled block inside a section card: either a bullet list or a paragraph. */
export interface GettingStartedGroup {
  label: string;
  items?: GettingStartedListItem[];
  text?: string;
  actions?: GettingStartedAction[];
}

export interface GettingStartedSection {
  title: string;
  groups: GettingStartedGroup[];
}

export interface GettingStarted {
  title: string;
  important_links: string;
  sidebar_links: GettingStartedAction[];
  sections: GettingStartedSection[];
}
