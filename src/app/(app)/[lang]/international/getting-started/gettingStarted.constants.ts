import type { GettingStartedLinkKey } from "./gettingStarted.types";

/**
 * Targets of the buttons and inline links on the page. Values starting with a
 * slash are internal routes and get the locale prefix when rendered, everything
 * else is opened in a new tab.
 */
export const GETTING_STARTED_LINKS: Record<GettingStartedLinkKey, string> = {
  mobility: "/international/mobility-programs",
  neptun: "https://neptun.bme.hu/hallgatoi/login.aspx",
  neptun_guides: "https://kth.bme.hu/en/for-students/about-neptun",
  newsletter: "https://www.kth.bme.hu/en/news/2318/",
  budapest_go: "https://bkk.hu/budapestgo/",
  residence_permit: "https://www.imt.bme.hu/immigration/application/",
  taj_card: "https://www.imt.bme.hu/taj/",
  student_id: "https://www.kth.bme.hu/en/for-students/faq/student-id-card/",
  kth: "https://kth.bme.hu/",
  nki: "https://nki.bme.hu/",
};
