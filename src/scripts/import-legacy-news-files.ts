import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const NDJSON = "/tmp/opencode/legacy-news.ndjson";
const OLDROOT = "/home/albi/ehk.bak/ehk.bme.hu";
const TMP = path.join(os.tmpdir(), "ehk-media");
const DRY = process.env.IMP_DRY === "1";
const LIMIT = process.env.IMP_LIMIT ? Number(process.env.IMP_LIMIT) : 0;
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?|odt|ods|txt|zip|rar|csv)$/i;

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
function parseDate(day: string): string | null {
  if (!/^\d{8}$/.test(day)) return null;
  return new Date(Date.UTC(+day.slice(0, 4), +day.slice(4, 6) - 1, +day.slice(6, 8), 12)).toISOString();
}
function slugifyBase(base: string): string {
  const ext = (base.match(/\.[a-z0-9]+$/i) ?? [""])[0];
  const stem = base.slice(0, base.length - ext.length);
  const safe = stem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  return (safe || "file") + ext.toLowerCase();
}

// ---------- file index & resolver ----------
const byBase = new Map<string, string[]>();
const walk = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else {
      const rel = p.slice(OLDROOT.length + 1);
      const b = e.name.toLowerCase();
      if (!byBase.has(b)) byBase.set(b, []);
      byBase.get(b)!.push(rel);
    }
  }
};
walk(path.join(OLDROOT, "letoltesek"));
walk(path.join(OLDROOT, "kepek"));
walk(path.join(OLDROOT, "images"));

function segMatch(cand: string, rel: string): number {
  const a = cand.toLowerCase().split("/");
  const b = rel.toLowerCase().split("/");
  let n = 0;
  while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++;
  return n;
}
function resolve(href: string): string | null {
  let u: URL;
  try { u = new URL(href.replace(/&amp;/g, "&"), "http://ehk.bme.hu/"); } catch { return null; }
  if (!/^(www\.)?ehk\.bme\.hu$/.test(u.hostname)) return null;
  let rel: string;
  try { rel = decodeURIComponent(u.pathname).replace(/^\/+/, ""); } catch { rel = u.pathname.replace(/^\/+/, ""); }
  if (!rel) return null;
  if (fs.existsSync(path.join(OLDROOT, rel))) return rel;

  const base = rel.split("/").pop()!.toLowerCase();
  let cands = byBase.get(base) ?? [];
  if (cands.length > 1) cands = [...cands].sort((x, y) => segMatch(y, rel) - segMatch(x, rel) || (x.includes("/regihonlap/") ? 1 : 0) - (y.includes("/regihonlap/") ? 1 : 0));
  if (cands.length) return cands[0];

  // normalized basename fallback (accents/underscores)
  const nb = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9.]+/g, "_");
  for (const [k, v] of byBase) {
    if (k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9.]+/g, "_") === nb) return v[0];
  }
  return null;
}

const payload = await getPayload({ config });
const rows: any[] = fs.readFileSync(NDJSON, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

// ---------- phase 0: drop hidden ----------
const stats: any = { hiddenFound: 0, hiddenDeleted: 0, newsProcessed: 0, newsUpdated: 0, mediaUploaded: 0, mediaReused: 0, filesAttached: 0, unresolved: 0, externalOrPage: 0, dupFilename: 0 };
const missing: string[] = [];

for (const r of rows) {
  if (Number(r.visible) !== 0) continue;
  stats.hiddenFound++;
  const title = textOf(r.cim) || `Hír #${r.id}`;
  const date = parseDate(r.day);
  if (!date) continue;
  const found = await payload.find({ collection: "news", limit: 1, pagination: false, where: { and: [{ title: { equals: title } }, { date: { equals: date } }] } });
  if (found.docs.length) {
    if (!DRY) await payload.delete({ collection: "news", id: found.docs[0].id });
    stats.hiddenDeleted++;
  }
}
console.log(`[hidden] found=${stats.hiddenFound} deleted=${stats.hiddenDeleted}`);

// ---------- phase 1: files ----------
fs.mkdirSync(TMP, { recursive: true });
const anchorRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
const target = LIMIT ? rows.filter((r) => Number(r.visible) !== 0).slice(0, LIMIT) : rows.filter((r) => Number(r.visible) !== 0);

for (const r of target) {
  const title = textOf(r.cim) || `Hír #${r.id}`;
  const date = parseDate(r.day);
  if (!date) continue;
  const found = await payload.find({ collection: "news", limit: 1, pagination: false, where: { and: [{ title: { equals: title } }, { date: { equals: date } }] } });
  if (!found.docs.length) continue;
  const news = found.docs[0];
  stats.newsProcessed++;

  const seen = new Set<string>();
  const entries: any[] = [];
  for (const m of (r.szoveg || "").matchAll(anchorRe)) {
    const href = m[1];
    if (seen.has(href) || !DOC_EXT.test(href.split("?")[0])) continue;
    seen.add(href);
    const rel = resolve(href);
    if (!rel) {
      if (/^https?:\/\//i.test(href) && !/ehk\.bme\.hu/.test(href)) stats.externalOrPage++;
      else { stats.unresolved++; if (missing.length < 40) missing.push(href); }
      continue;
    }
    const srcAbs = path.join(OLDROOT, rel);
    const filename = `${crypto.createHash("sha1").update(rel).digest("hex").slice(0, 8)}-${slugifyBase(path.basename(rel))}`;
    const description = textOf(m[2]).slice(0, 200) || path.basename(rel);

    let media = (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { equals: filename } } })).docs[0];
    if (media) stats.mediaReused++;
    else if (DRY) stats.wouldUpload = (stats.wouldUpload ?? 0) + 1;
    else {
      const tmpPath = path.join(TMP, filename);
      fs.copyFileSync(srcAbs, tmpPath);
      try {
        media = await payload.create({ collection: "media", data: { alt: description }, filePath: tmpPath });
        stats.mediaUploaded++;
      } finally {
        fs.unlinkSync(tmpPath);
      }
    }
    if (!media && !DRY) continue;
    entries.push({ file: media?.id ?? 0, description });
  }

  if (entries.length) {
    if (!DRY) await payload.update({ collection: "news", id: news.id, data: { files: entries } });
    stats.newsUpdated++;
    stats.filesAttached += entries.length;
  }
}

console.log("STATS:", JSON.stringify(stats));
if (missing.length) { console.log("MISSING(files not found locally):"); missing.forEach((x) => console.log("  ", x)); }
process.exit(0);
