import type { MobilityLinkKey } from "./mobility.types";

/**
 * Targets of the buttons on the page. Values starting with a slash are internal
 * routes and get the locale prefix when rendered, everything else opens in a
 * new tab.
 */
export const MOBILITY_LINKS: Record<MobilityLinkKey, string> = {
  erasmus: "/kulugy/erasmus",
  eelisa: "/kulugy/eelisa",
  athens: "https://nki.bme.hu/BMEAthens",
  ceepus: "https://nki.bme.hu/CEEPUS",
  aiesec: "https://www.aiesec.hu/",
};
