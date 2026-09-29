import fs from "fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { convertHTMLToLexical } from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";

const NDJSON = "/tmp/opencode/legacy-news.ndjson";
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?|odt|ods|txt|zip|rar|csv)$/i;
const SAMPLE = process.env.SAMPLE ? Number(process.env.SAMPLE) : 0;

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

// keep non-file anchors (restoring hyperlinks), flatten file-download anchors to their text
function preprocess(html: string): string {
  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/\r/g, "");
  out = out.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_m, attrs: string, inner: string) => {
    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    const href = (hrefMatch?.[1] ?? "").replace(/&amp;/g, "&").trim();
    const isDownload = /file_download_a/i.test(attrs) || DOC_EXT.test(href.split("?")[0]);
    if (isDownload || !href) return inner;
    const newTab = /target="_blank"/i.test(attrs) ? ' target="_blank"' : "";
    return `<a href="${encodeURI(href)}"${newTab}>${inner}</a>`;
  });
  return out;
}

const payload = await getPayload({ config });
const newsCol = payload.config.collections.find((c) => c.slug === "news")!;
const descField: any = (newsCol.fields as any[]).find((f) => f.name === "description");
const editorConfig = descField.fields.find((f: any) => f.name === "text_hu").editor.editorConfig;

const rows: any[] = fs.readFileSync(NDJSON, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
const target = SAMPLE ? rows.filter((r) => Number(r.id) === SAMPLE) : rows;

const stats = { processed: 0, updated: 0, failed: 0, withLinks: 0 };
const failures: any[] = [];
for (const r of target) {
  const title = textOf(r.cim) || `Hír #${r.id}`;
  const date = parseDate(r.day);
  if (!date) continue;
  const found = await payload.find({ collection: "news", limit: 1, pagination: false, where: { and: [{ title: { equals: title } }, { date: { equals: date } }] } });
  if (!found.docs.length) continue;
  stats.processed++;
  try {
    const html = preprocess(r.szoveg || "");
    const lexical = convertHTMLToLexical({ editorConfig, html, JSDOM });
    const hasLink = JSON.stringify(lexical).includes('"type":"link"');
    if (hasLink) stats.withLinks++;
    await payload.update({ collection: "news", id: found.docs[0].id, data: { description: { text_hu: lexical, text_en: lexical } } });
    stats.updated++;
  } catch (e: any) {
    stats.failed++;
    if (failures.length < 20) failures.push({ id: r.id, error: String(e?.message ?? e).slice(0, 200) });
  }
}
console.log("STATS:", JSON.stringify(stats));
if (failures.length) console.log("FAILURES:", JSON.stringify(failures, null, 2));
process.exit(0);
