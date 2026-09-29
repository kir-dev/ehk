import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";
import { convertHTMLToLexical } from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";

const ROOT = "/home/albi/ehk.bak/ehk.bme.hu";
const TMP = path.join(os.tmpdir(), "ehk-media");
const DRY = process.env.REG_DRY === "1";

type Type = "academic" | "benefits" | "dormitory";
// One regulation per legacy page; pages describing the same regulation are folded into the canonical source.
const PAGES: { url: string; type: Type; name_hu: string; name_en: string }[] = [
  { url: "/szabalyzat/ehkugyrend", type: "academic", name_hu: "EHK ügyrend", name_en: "EHK Rules of Procedure" },
  { url: "/szabalyzat/hok", type: "academic", name_hu: "Hallgatói Önkormányzat Alapszabálya", name_en: "Student Government Statutes" },
  { url: "/szabalyzat/hdok", type: "academic", name_hu: "Hallgatói és Doktorandusz Önkormányzat Alapszabálya", name_en: "Student and Doctoral Student Government Statutes" },
  { url: "/szabalyzat/HFJSZ", type: "academic", name_hu: "Hallgatók Fegyelmi és Jogorvoslati Szabályzata", name_en: "Student Disciplinary and Appeals Regulations" },
  { url: "/szabalyzat/KED", type: "academic", name_hu: "Különeljárási díjak szabályozása", name_en: "Special Procedure Fees" },
  { url: "/eszb/tvsz", type: "academic", name_hu: "BME Tanulmányi és Vizsgaszabályzat", name_en: "BME Academic and Examination Regulations" },
  { url: "/szabalyzat/koljog", type: "academic", name_hu: "Kollektív Jogok Szabályzata", name_en: "Collective Rights Regulations" },
  { url: "/szabalyzat/oktatasiszabalyzat", type: "academic", name_hu: "Oktatási szabályzatok", name_en: "Academic Regulations" },
  { url: "/juttatas/tjsz", type: "benefits", name_hu: "Térítési és Juttatási Szabályzat", name_en: "Regulations on Fees and Benefits" },
  { url: "/szabalyzat/kolleskollfelv", type: "dormitory", name_hu: "Kollégiumi felvételi szabályzat", name_en: "Dormitory Admission Regulations" },
];

const slugifyBase = (base: string) => {
  const ext = (base.match(/\.[a-z0-9]+$/i) ?? [""])[0];
  const stem = base.slice(0, base.length - ext.length);
  const safe = stem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  return (safe || "file") + ext.toLowerCase();
};
function fallbackLexical(text: string) {
  const paras = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  return { root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr",
    children: (paras.length ? paras : ["—"]).map((t) => ({ type: "paragraph", format: "", indent: 0, version: 1, direction: "ltr", textStyle: "", textFormat: 0,
      children: [{ mode: "normal", text: t, type: "text", style: "", detail: 0, format: 0, version: 1 }] })) } };
}

const byBase = new Map<string, string[]>();
const walk = (d: string) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else { const rel = p.slice(ROOT.length + 1); const b = e.name.toLowerCase(); if (!byBase.has(b)) byBase.set(b, []); byBase.get(b)!.push(rel); } } };
for (const d of ["letoltesek"]) walk(path.join(ROOT, d));
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9.]+/g, "_").toLowerCase();
const byNorm = new Map<string, string[]>();
for (const [b, arr] of byBase) { const n = norm(b); if (!byNorm.has(n)) byNorm.set(n, []); byNorm.get(n)!.push(...arr); }
function resolve(p: unknown): string | null {
  if (!p || typeof p !== "string") return null;
  const rel = p.replace(/^\/+/, "");
  if (fs.existsSync(path.join(ROOT, rel))) return rel;
  const base = rel.split("/").pop()!.toLowerCase();
  const c = byBase.get(base) ?? [];
  if (c.length === 1) return c[0];
  if (c.length > 1) { const s = c.filter((x) => x.toLowerCase().endsWith(rel.toLowerCase())); if (s.length === 1) return s[0]; return c[0]; }
  const cc = byNorm.get(norm(base)) ?? []; return cc.length ? cc[0] : null;
}

const payload = await getPayload({ config });
fs.mkdirSync(TMP, { recursive: true });
const regCol = payload.config.collections.find((c) => c.slug === "regulations")!;
const editorConfig = ((regCol.fields as any[]).find((f) => f.name === "text_hu")).editor.editorConfig;

const pages = JSON.parse(fs.readFileSync("/tmp/opencode/reg-pages.json", "utf8")) as Record<string, Record<string, string>>;

async function upload(rel: string, alt: string) {
  const filename = `${crypto.createHash("sha1").update(rel).digest("hex").slice(0, 8)}-${slugifyBase(path.basename(rel))}`;
  const prefix = filename.slice(0, 8);
  const found = (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { equals: filename } } })).docs[0]
    ?? (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { like: prefix } } })).docs[0];
  if (found) return { id: found.id, url: found.url as string };
  if (DRY) return { id: 0, url: "" };
  const tmp = path.join(TMP, filename);
  fs.copyFileSync(path.join(ROOT, rel), tmp);
  try { const m = await payload.create({ collection: "media", data: { alt }, filePath: tmp }); return { id: m.id, url: m.url as string }; }
  finally { fs.unlinkSync(tmp); }
}

const stats = { pages: 0, created: 0, updated: 0, docs: 0, failedDocs: 0 };
const summary: any[] = [];

for (const page of PAGES) {
  const html = pages[page.url]?.cikk;
  if (!html) { summary.push({ url: page.url, name: page.name_hu, note: "no source html" }); continue; }
  stats.pages++;

  // upload every local doc anchor; build href->media url map
  const hrefMap = new Map<string, { id: number; url: string; text: string }>();
  let primary: { id: number; url: string; text: string } | undefined;
  const anchorRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const m of html.matchAll(anchorRe)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (hrefMap.has(href)) continue;
    const rel = resolve(href);
    if (!rel) continue;
    const text = m[2].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
    try {
      const up = await upload(rel, (text || page.name_hu).slice(0, 200));
      hrefMap.set(href, { ...up, text });
      if (!primary) primary = { ...up, text };
      stats.docs++;
    } catch { stats.failedDocs++; }
  }

  // rewrite anchors to new media urls, keep non-file links, drop missing-file anchors to text
  let body = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<img[^>]*>/gi, "");
  body = body.replace(anchorRe, (_m, href: string, inner: string) => {
    const clean = href.replace(/&amp;/g, "&");
    const up = hrefMap.get(clean);
    if (up) return `<a href="${up.url}">${inner}</a>`;
    if (/file_download_a/i.test(_m)) return inner;
    try { return `<a href="${encodeURI(clean)}"${/target="_blank"/i.test(_m) ? ' target="_blank"' : ""}>${inner}</a>`; }
    catch { return inner; }
  });

  let lexical: any;
  try { lexical = convertHTMLToLexical({ editorConfig, html: body, JSDOM }); } catch { lexical = fallbackLexical(page.name_hu); }
  if (!lexical?.root?.children?.length) lexical = fallbackLexical(page.name_hu);

  const data: any = {
    name_hu: page.name_hu, name_en: page.name_en, type: page.type,
    text_hu: lexical, text_en: lexical,
    displayText_hu: (primary?.text || page.name_hu).slice(0, 200),
    displayText_en: (primary?.text || page.name_en).slice(0, 200),
    ...(primary ? { file: primary.id } : {}),
  };

  const existing = (await payload.find({ collection: "regulations", limit: 1, pagination: false, where: { and: [{ name_hu: { equals: page.name_hu } }, { type: { equals: page.type } }] } })).docs[0];
  if (!DRY) {
    if (existing) { await payload.update({ collection: "regulations", id: existing.id, data }); stats.updated++; }
    else { await payload.create({ collection: "regulations", data }); stats.created++; }
  }
  summary.push({ url: page.url, name: page.name_hu, type: page.type, docs: hrefMap.size, primaryFile: primary?.id ?? null });
}
console.log("STATS:", JSON.stringify(stats));
console.log("SUMMARY:", JSON.stringify(summary, null, 2));
process.exit(0);
