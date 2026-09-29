import fs from "fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { convertHTMLToLexical } from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";

const NDJSON = "/tmp/opencode/legacy-news.ndjson";
const DEFAULT_TAG = "Tájékoztatás";

// legacy category -> new enum_news_tags value ("" = drop)
const TAG_MAP: Record<string, string> = {
  "főoldali hír": "",
  "pályázat": "Pályázat",
  "ebme pályázat": "Pályázat",
  "TDK pályázat": "Pályázat",
  "NFÖD": "Pályázat",
  "műhal utazási pályázat": "Pályázat",
  "műhal esélyegyenlőségi pályázat": "Pályázat",
  "műhal sportutazási pályázat": "Pályázat",
  "működési pályázat": "Pályázat",
  "sportszer pályázat": "Pályázat",
  "gólyatábor szervezői pályázat": "Pályázat",
  "versenysport pályázat": "Pályázat",
  "jozsef": "Pályázat",
  "sport": "Sport",
  "sportösztöndíj": "Sport",
  "jó tanuló jó sportoló": "Sport",
  "versenycsapat": "Sport",
  "sportpálya pályázat": "Sportpálya pályázat",
  "sportterem igénylés": "Sportpálya igénylés",
  "ehk": "EHK",
  "külügyi": "Külügy",
  "külföldi ösztöndíj": "Külügy",
  "közösségi ösztöndíj": "Juttatás",
  "bírálói ösztöndíj": "Juttatás",
  "biralok": "Juttatás",
  "juttatás": "Juttatás",
  "mvkod": "Juttatás",
  "mvk öd": "Juttatás",
  "eebkoli": "Juttatás",
  "köztársasági ösztöndíj": "Juttatás",
  "szakgyak": "Juttatás",
  "Budapest Ösztöndíj Program": "Juttatás",
  "RENDSZERES SZOCIÁLIS ÖSZTÖNDÍJ ÉS ALAPTÁMOGATÁS PÁLYÁZATOKAT": "Juttatás",
  "TDK ösztöndíj": "TDK ösztöndíj",
  "kollégium": "Kollégium",
  "HEB koli": "Kollégium",
  "oktatás": "Oktatás",
  "GT szervezői": "Közélet",
  "egyetemi körök": "Közélet",
  "szórakozás": "Közélet",
  "szabályzatok": "Tájékoztatás",
  "műhely": "Tájékoztatás",
  "BME-s leszek": "Tájékoztatás",
};

// legacy HTML is full of entities and <img>; entities stay, images are handled later
function preprocess(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/\r/g, "");
}

function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&aacute;/gi, "á").replace(/&eacute;/gi, "é").replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó").replace(/&ouml;/gi, "ö").replace(/&ő;/gi, "ő")
    .replace(/&uacute;/gi, "ú").replace(/&uuml;/gi, "ü").replace(/&ű;/gi, "ű")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function fallbackLexical(text: string) {
  const paragraphs = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const children = (paragraphs.length ? paragraphs : [""]).map((t) => ({
    type: "paragraph", format: "", indent: 0, version: 1, direction: "ltr", textStyle: "", textFormat: 0,
    children: t ? [{ mode: "normal", text: t, type: "text", style: "", detail: 0, format: 0, version: 1 }] : [],
  }));
  return { root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children } };
}

function parseDate(day: string): string | null {
  if (!/^\d{8}$/.test(day)) return null;
  const y = +day.slice(0, 4), m = +day.slice(4, 6), d = +day.slice(6, 8);
  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return isNaN(dt.getTime()) ? null : dt.toISOString();
}

function extractEmail(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const m = raw.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return m ? m[0] : undefined;
}

const payload = await getPayload({ config });

const newsCol = payload.config.collections.find((c) => c.slug === "news")!;
const descField: any = (newsCol.fields as any[]).find((f) => f.name === "description");
const editorConfig = descField.fields.find((f: any) => f.name === "text_hu").editor.editorConfig;

const rows: any[] = fs.readFileSync(NDJSON, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

const stats = { total: rows.length, created: 0, skipped: 0, failed: 0, fallbackLexical: 0 };
const tagUsage: Record<string, number> = {};
const failures: any[] = [];
const unmapped = new Set<string>();

for (const r of rows) {
  try {
    const date = parseDate(r.day);
    if (!date) throw new Error(`bad day: ${r.day}`);

    const tags = Array.from(new Set(
      (r.tags as string[]).flatMap((t) => {
        if (!(t in TAG_MAP)) { unmapped.add(t); return []; }
        const v = TAG_MAP[t];
        return v ? [v] : [];
      }),
    ));
    const finalTags = tags.length ? tags : [DEFAULT_TAG];
    finalTags.forEach((t) => (tagUsage[t] = (tagUsage[t] ?? 0) + 1));

    const title = textOf(r.cim) || `Hír #${r.id}`;

    const existing = await payload.find({
      collection: "news", limit: 1, pagination: false,
      where: { and: [{ title: { equals: title } }, { date: { equals: date } }] },
    });
    if (existing.docs.length) { stats.skipped++; continue; }

    const html = preprocess(r.szoveg || "");
    let huLexical: any;
    try {
      huLexical = convertHTMLToLexical({ editorConfig, html, JSDOM });
    } catch {
      huLexical = fallbackLexical(textOf(html));
      stats.fallbackLexical++;
    }
    const convertedText = textOf(html);
    const rootChildren = huLexical?.root?.children ?? [];
    if (!convertedText || rootChildren.length === 0) {
      huLexical = fallbackLexical(convertedText || title);
      stats.fallbackLexical++;
    }

    const excerpt = (textOf(r.keresoszoveg || "") || textOf(html)).slice(0, 300);

    await payload.create({
      collection: "news",
      data: {
        title,
        titleEng: title, // TODO: real EN translation
        shortDescription: { text_hu: excerpt, text_en: excerpt },
        description: { text_hu: huLexical, text_en: huLexical },
        date,
        tags: finalTags,
        contactEmail: extractEmail(r.email),
      },
    });
    stats.created++;
  } catch (e: any) {
    stats.failed++;
    failures.push({ id: r.id, title: r.cim, error: String(e?.message ?? e) });
  }
}

console.log("STATS:", JSON.stringify(stats));
console.log("TAG_USAGE:", JSON.stringify(tagUsage));
if (unmapped.size) console.log("UNMAPPED_LEGACY_TAGS:", [...unmapped].join(" | "));
if (failures.length) console.log("FAILURES:", JSON.stringify(failures.slice(0, 20), null, 2));
process.exit(0);
