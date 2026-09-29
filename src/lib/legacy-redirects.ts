// Maps legacy (ehk.bme.hu, no lang prefix) paths to the new site.
// Consumed by next.config.ts (as redirects) and by the body-link rewriter.

export type RedirectEntry = { source: string; destination: string; permanent: boolean };

const DORMITORY_SLUG: Record<string, string> = {
  baross: "baross",
  bercsenyi: "bercsenyi",
  karman: "karman",
  martos: "martos",
  schonherz: "sch",
  vasarhelyi: "vpk",
  wigner: "wigner",
};

const MUHELY = "https://muhely.bme.hu/";

// Exact legacy path -> new path/URL
export const EXACT: Record<string, string> = {
  "/": "/hu",
  "/hirek": "/hu",
  "/zhnaptar": "/hu",
  "/targygraf": "/hu",
  "/uvegzseb": "/hu",
  "/muhely": MUHELY,

  "/kollegium": "/hu/kollegium/kollegium-bemutato",
  "/kollegium/elerhetoseg": "/hu/kollegium/kollegium-bemutato",
  "/kollegium/teteny": "/hu/kollegium/kollegium-bemutato",
  "/kollegium/felveteli": "/hu/kollegium/felveteli-tajekoztato",

  "/juttatas": "/hu/szocialis-osztondijak",
  "/juttatas/tanulmanyi-osztondij": "/hu/tanulmanyi-osztondij",
  "/juttatas/kifizetesi-idopontok": "/hu/kifizetesi-idopontok",
  "/juttatas/tjsz": "/hu/juttatasi-szabalyzatok",
  "/juttatas/tvsz": "/hu/juttatasi-szabalyzatok",

  "/oktatas": "/hu/oktatas/hirek",
  "/oktatas/tvsz": "/hu/oktatasi-szabalyzatok",
  "/oktatas/nyelvoktatas": "/hu/nyelvoktatas",
  "/oktatas/mko": "/hu/kisokosok",
  "/oktatas/tantanacsadas": "/hu/kisokosok",

  "/sport": "/hu/sport/hirek",
  "/sport/sportpalya-palyazat": "/hu/sport/sportpalya-tamogatas",
  "/sport/sportterem-igenyles": "/hu/sport/sportterem-igenyles",

  "/palyazat": "/hu/ehk-osztondij",
  "/palyazat/ehk": "/hu/ehk-osztondij",
  "/palyazat/ebme": "/hu/ehk-osztondij",
  "/palyazat/kulugyi": "/hu/kulugy/erasmus",
  "/palyazat/kulfoldi-osztondijak": "/hu/kulugy/erasmus",

  "/szervezet": "/hu/kepviselok",
  "/szervezet/kepviselok": "/hu/kepviselok",
  "/szervezet/emlekeztetok": "/hu/emlekeztetok",
  "/szervezet/hatarozattar": "/hu/hatarozatok-tara",
  "/szervezet/alszervezetek": "/hu/kozelet",
  "/szervezet/ontevekeny-korok": "/hu/kozelet/ontevekenykorok",
  "/szervezet/kari-ontevekeny-korok": "/hu/kozelet/ontevekenykorok",
  "/szervezet/hallgatoi-rendezvenyek": "/hu/kozelet/rendezvenyek",
  "/szervezet/plakatolas": "/hu/engedelyek",
  "/szervezet/forgatasiengedely": "/hu/engedelyek",
  "/szervezet/rendezvenyengedely": "/hu/engedelyek",
  "/szervezet/rendezvenyengedelyeztetes": "/hu/engedelyek",

  "/szabalyzat": "/hu/oktatasi-szabalyzatok",
  "/szabalyzat/oktatasiszabalyzat": "/hu/oktatasi-szabalyzatok",
  "/szabalyzat/tvsz": "/hu/oktatasi-szabalyzatok",
  "/szabalyzat/hok": "/hu/oktatasi-szabalyzatok",
  "/szabalyzat/KED": "/hu/juttatasi-szabalyzatok",
  "/szabalyzat/HFJSZ": "/hu/juttatasi-szabalyzatok",
  "/szabalyzat/tjsz": "/hu/juttatasi-szabalyzatok",
  "/szabalyzat/koljog": "/hu/kollegium/kollegium-szabalyzatok",
  "/szabalyzat/kolleskollfelv": "/hu/kollegium/kollegium-szabalyzatok",
  "/szabalyzat/hdok": "/hu/kollegium/kollegium-szabalyzatok",

  "/eszb": "/hu/szocialis-osztondijak",
};
for (const [slug, newSlug] of Object.entries(DORMITORY_SLUG)) {
  EXACT[`/kollegium/${slug}`] = `/hu/kollegium/kollegium-bemutato/${newSlug}`;
}

// Longest-prefix-first; fixed destination (no wildcard substitution).
export const PREFIX: [string, string][] = [
  ["/szervezet/kepviselok/", "/hu/kepviselok"],
  ["/szervezet/emlekeztetok/", "/hu/emlekeztetok"],
  ["/eszb/szervezet/emlekeztetok", "/hu/emlekeztetok"],
  ["/eszb/szervezet/hatarozatok-tara", "/hu/hatarozatok-tara"],
  ["/szervezet/hatarozattar/", "/hu/hatarozatok-tara"],
  ["/muhely/", MUHELY],
  ["/eszb/", "/hu/szocialis-osztondijak"],
  ["/szabalyzat/", "/hu/oktatasi-szabalyzatok"],
  ["/juttatas/", "/hu/szocialis-osztondijak"],
  ["/palyazat/", "/hu/ehk-osztondij"],
  ["/kollegium/", "/hu/kollegium/kollegium-bemutato"],
  ["/szervezet/", "/hu/kepviselok"],
  ["/sport/", "/hu/sport/hirek"],
  ["/oktatas/", "/hu/oktatas/hirek"],
  ["/kereses/", "/hu"],
];
PREFIX.sort((a, b) => b[0].length - a[0].length);

/** Resolve a legacy pathname to a new destination, or null if unknown. */
export function resolveLegacyPath(pathname: string): string | null {
  let p = pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  try { p = decodeURIComponent(p); } catch { /* keep raw */ }

  if (EXACT[p]) return EXACT[p];
  if (p.length > 1) {
    const trimmed = p + "/";
    if (EXACT[trimmed]) return EXACT[trimmed];
  }
  for (const [prefix, dest] of PREFIX) {
    if (p === prefix.replace(/\/$/, "") || p.startsWith(prefix)) return dest;
  }
  return null;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function prefixToNextSource(prefix: string): string {
  const base = prefix.replace(/\/$/, "");
  return escapeRe(base) + "/:path*";
}
