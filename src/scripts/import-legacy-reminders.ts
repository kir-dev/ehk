import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const ROOT = "/home/albi/ehk.bak/ehk.bme.hu";
const TMP = path.join(os.tmpdir(), "ehk-media");
const DRY = process.env.REM_DRY === "1";
const MAX = process.env.REM_MAX ? Number(process.env.REM_MAX) : 0;

const SOURCES: { file: string; type: "EHK" | "EHDK" }[] = [
  { file: "/tmp/opencode/rem-ehk.json", type: "EHK" },
  { file: "/tmp/opencode/rem-ehdk.json", type: "EHDK" },
  { file: "/tmp/opencode/rem-eszb.json", type: "EHK" }, // ESZB has no enum value; mapped to EHK
];

const slugifyBase = (base: string) => {
  const ext = (base.match(/\.[a-z0-9]+$/i) ?? [""])[0];
  const stem = base.slice(0, base.length - ext.length);
  const safe = stem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  return (safe || "file") + ext.toLowerCase();
};
const iso = (y: number, m: number, d: number) => {
  if (y < 1990 || y > 2100) return null;
  const mm = Math.min(12, Math.max(1, m || 1)), dd = Math.min(28, Math.max(1, d || 1));
  return new Date(Date.UTC(y, mm - 1, dd, 12)).toISOString();
};
function dateOf(name: string, file: string): string | null {
  const s = String(name ?? "");
  let m = s.match(/(\d{4})[.\-\/]\s*(\d{1,2})[.\-\/]\s*(\d{1,2})/);
  if (m) { const r = iso(+m[1], +m[2], +m[3]); if (r) return r; }
  m = s.match(/(\d{4})[.\-\/]\s*(\d{1,2})/);
  if (m) { const r = iso(+m[1], +m[2], 1); if (r) return r; }
  m = s.match(/(19|20)\d{2}/);
  if (m) { const r = iso(+m[0], 1, 1); if (r) return r; }
  const b = String(file ?? "").split("/").pop() ?? "";
  const nums = b.match(/\d+/g) ?? [];
  let year = nums.find((n) => /^(19|20)\d{2}$/.test(n));
  if (!year) { const two = (b.match(/(?:^|_)(\d{2})_/) ?? [])[1]; if (two) { const y = +two; year = String(y <= 40 ? 2000 + y : 1900 + y); } }
  if (year) { const i = nums.indexOf(year); return iso(+year, nums[i + 1] ? +nums[i + 1] : 1, nums[i + 2] ? +nums[i + 2] : 1); }
  return null;
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

const stats = { total: 0, created: 0, updated: 0, skippedNoFile: 0, mediaUploaded: 0, mediaReused: 0, failed: 0 };
const bad: any[] = [];
async function upload(rel: string, alt: string) {
  const filename = `${crypto.createHash("sha1").update(rel).digest("hex").slice(0, 8)}-${slugifyBase(path.basename(rel))}`;
  const prefix = filename.slice(0, 8);
  let found = (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { equals: filename } } })).docs[0]
    ?? (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { like: prefix } } })).docs[0];
  if (found) { stats.mediaReused++; return found.id; }
  if (DRY) return 0;
  const tmp = path.join(TMP, filename);
  fs.copyFileSync(path.join(ROOT, rel), tmp);
  try { const m = await payload.create({ collection: "media", data: { alt }, filePath: tmp }); stats.mediaUploaded++; return m.id; }
  finally { fs.unlinkSync(tmp); }
}

let processed = 0;
for (const src of SOURCES) {
  const items = JSON.parse(fs.readFileSync(src.file, "utf8")) as any[];
  for (const it of items) {
    if (MAX && processed >= MAX) break;
    processed++;
    stats.total++;
    try {
      if (!it.file) { stats.skippedNoFile++; continue; }
      const rel = resolve(it.file);
      if (!rel) { stats.failed++; bad.push({ name: it.name, file: it.file, error: "file not found" }); continue; }
      const date = dateOf(it.name, it.file);
      if (!date) { stats.failed++; bad.push({ name: it.name, file: it.file, error: "no date" }); continue; }
      const displayText = String(it.name ?? path.basename(rel)).slice(0, 200);
      const existing = (await payload.find({ collection: "reminders", limit: 1, pagination: false, where: { and: [{ displayText: { equals: displayText } }, { type: { equals: src.type } }] } })).docs[0];
      const fileId = await upload(rel, displayText);
      if (DRY) continue;
      const data: any = { date, displayText, type: src.type, file: fileId };
      if (existing) { await payload.update({ collection: "reminders", id: existing.id, data }); stats.updated++; }
      else { await payload.create({ collection: "reminders", data }); stats.created++; }
    } catch (e: any) { stats.failed++; bad.push({ name: it.name, error: String(e?.message ?? e).slice(0, 140) }); }
  }
}
console.log("STATS:", JSON.stringify(stats));
if (bad.length) console.log("BAD:", JSON.stringify(bad.slice(0, 15), null, 2));
process.exit(0);
