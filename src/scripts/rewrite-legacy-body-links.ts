import fs from "fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { resolveLegacyPath } from "@/lib/legacy-redirects";

const NDJSON = "/tmp/opencode/legacy-news.ndjson";

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

// build legacy news permalink -> new id map
const newsMap = new Map<string, string>();
for (const r of rows) {
  if (Number(r.visible) === 0) continue;
  const title = textOf(r.cim) || `Hír #${r.id}`;
  const date = parseDate(r.day);
  if (!date) continue;
  const found = await payload.find({ collection: "news", limit: 1, pagination: false, where: { and: [{ title: { equals: title } }, { date: { equals: date } }] } });
  if (found.docs.length) newsMap.set(`/hirek/${r.day}/${r.seo}`, `/hu/hirek/${found.docs[0].id}`);
}

function rewriteUrl(raw: string): string | null {
  let u: URL;
  try { u = new URL(raw); } catch { return null; }
  if (!/^(www\.)?ehk\.bme\.hu$/.test(u.hostname)) return null;
  let path: string;
  try { path = decodeURIComponent(u.pathname); } catch { path = u.pathname; }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (newsMap.has(path)) return newsMap.get(path)!;
  return resolveLegacyPath(path);
}

function walk(node: any, counter: { n: number }): void {
  if (!node || typeof node !== "object") return;
  if (node.type === "link" && node.fields?.url) {
    const next = rewriteUrl(String(node.fields.url));
    if (next && next !== node.fields.url) {
      node.fields.url = next;
      if (/^https?:\/\//.test(next)) node.fields.newTab = true;
      counter.n++;
    }
  }
  for (const key of ["children", "root"]) {
    const v = node[key];
    if (Array.isArray(v)) v.forEach((c) => walk(c, counter));
    else if (v && typeof v === "object") walk(v, counter);
  }
}

const news = await payload.find({ collection: "news", limit: 0, pagination: false, depth: 0 });
let docsChanged = 0, linksChanged = 0;
for (const doc of news.docs as any[]) {
  const counter = { n: 0 };
  const hu = JSON.parse(JSON.stringify(doc.description?.text_hu ?? null));
  const en = JSON.parse(JSON.stringify(doc.description?.text_en ?? null));
  if (hu) walk(hu, counter);
  if (en) walk(en, counter);
  if (counter.n > 0) {
    await payload.update({ collection: "news", id: doc.id, data: { description: { text_hu: hu, text_en: en } } });
    docsChanged++; linksChanged += counter.n;
  }
}
console.log("REWRITE:", JSON.stringify({ newsMap: newsMap.size, docsChanged, linksChanged, scanned: news.docs.length }));
process.exit(0);
