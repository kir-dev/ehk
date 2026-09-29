import fs from "fs";
import { getPayload } from "payload";
import config from "@payload-config";

const NDJSON = "/tmp/opencode/legacy-news.ndjson";
const OUT = "src/lib/legacy-news-redirects.json";

function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ").trim();
}
function parseDate(day: string): string | null {
  if (!/^\d{8}$/.test(day)) return null;
  return new Date(Date.UTC(+day.slice(0, 4), +day.slice(4, 6) - 1, +day.slice(6, 8), 12)).toISOString();
}

const payload = await getPayload({ config });
const rows: any[] = fs.readFileSync(NDJSON, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

const entries: { source: string; destination: string; permanent: boolean }[] = [];
let missing = 0;
for (const r of rows) {
  if (Number(r.visible) === 0) continue;
  const title = textOf(r.cim) || `Hír #${r.id}`;
  const date = parseDate(r.day);
  if (!date) continue;
  const found = await payload.find({ collection: "news", limit: 1, pagination: false, where: { and: [{ title: { equals: title } }, { date: { equals: date } }] } });
  if (!found.docs.length) { missing++; continue; }
  entries.push({ source: `/hirek/${r.day}/${r.seo}`, destination: `/hu/hirek/${found.docs[0].id}`, permanent: true });
}
entries.sort((a, b) => a.source.localeCompare(b.source));
fs.writeFileSync(OUT, JSON.stringify(entries, null, 0) + "\n");
console.log("NEWS_REDIRECTS:", entries.length, "missing:", missing, "->", OUT);
process.exit(0);
