import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const ROOT = "/home/albi/ehk.bak/ehk.bme.hu";
const TMP = path.join(os.tmpdir(), "ehk-media");
const GROUP = process.env.REPS_GROUP ?? "all"; // all | current | former
const MAX = process.env.REPS_MAX ? Number(process.env.REPS_MAX) : 0;
const OFFSET = process.env.REPS_OFFSET ? Number(process.env.REPS_OFFSET) : 0;
const DRY = process.env.REPS_DRY === "1";
const FACULTIES = new Set(["ÉMK", "GPK", "ÉPK", "VBK", "VIK", "GTK", "TTK", "KJK"]);

const clean = (s: unknown) => String(s ?? "").replace(/\s*\([^)]*\)\s*$/, "").trim();
const parseFaculty = (s: unknown) => {
  const m = String(s ?? "").match(/\(([^)]+)\)\s*$/);
  return m && FACULTIES.has(m[1].trim()) ? m[1].trim() : undefined;
};
const slugifyBase = (base: string) => {
  const ext = (base.match(/\.[a-z0-9]+$/i) ?? [""])[0];
  const stem = base.slice(0, base.length - ext.length);
  const safe = stem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  return (safe || "file") + ext.toLowerCase();
};
function lexical(text: string) {
  let paras = String(text ?? "").split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (!paras.length) paras = ["Bemutatkozás hamarosan."];
  return {
    root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr",
      children: paras.map((t) => ({ type: "paragraph", format: "", indent: 0, version: 1, direction: "ltr", textStyle: "", textFormat: 0,
        children: [{ mode: "normal", text: t, type: "text", style: "", detail: 0, format: 0, version: 1 }] })) },
  };
}

// file index / resolver
const byBase = new Map<string, string[]>();
const walk = (d: string) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else { const rel = p.slice(ROOT.length + 1); const b = e.name.toLowerCase(); if (!byBase.has(b)) byBase.set(b, []); byBase.get(b)!.push(rel); }
  }
};
for (const d of ["letoltesek", "kepek", "images"]) walk(path.join(ROOT, d));
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
  const cc = byNorm.get(norm(base)) ?? [];
  return cc.length ? cc[0] : null;
}

const payload = await getPayload({ config });
fs.mkdirSync(TMP, { recursive: true });

const kep = JSON.parse(fs.readFileSync("/tmp/opencode/reps-kepviselok.json", "utf8")) as any[];
const volt = JSON.parse(fs.readFileSync("/tmp/opencode/reps-voltkepviselok.json", "utf8")) as any[];
const besz = fs.readFileSync("/tmp/opencode/reps-beszamolok.tsv", "utf8").split("\n").filter(Boolean)
  .map((l) => { const i = l.indexOf("\t"); return { name: decodeURIComponent(l.slice(0, i).split("/").pop()!), reports: JSON.parse(l.slice(i + 1)) as any[] }; });

const reportsBy = new Map<string, any[]>();
for (const b of besz) reportsBy.set(clean(b.name), b.reports);

type Rep = { legacy: string; clean: string; faculty?: string; pos?: string; emails?: string[]; photo?: string; about?: string; current: boolean; order: number };
const reps: Rep[] = [];
const seen = new Set<string>();
const pushRep = (r: Rep) => { if (!r.clean || seen.has(r.clean)) return; seen.add(r.clean); reps.push(r); };
kep.forEach((p, i) => pushRep({ legacy: p.name, clean: clean(p.name), faculty: parseFaculty(p.name), pos: p.pos || undefined, emails: p.email ? String(p.email).split(/[,\s]+/).filter((e) => /^[\x00-\x7F]+$/.test(e) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) : undefined, photo: p.photo || undefined, about: p.about || undefined, current: true, order: i + 1 }));
volt.forEach((p, i) => pushRep({ legacy: p.name, clean: clean(p.name), faculty: parseFaculty(p.name), current: false, order: 1000 + i }));
for (const name of [...reportsBy.keys()].sort()) pushRep({ legacy: name, clean: name, faculty: parseFaculty(name), current: false, order: 2000 + reps.length });

let list = reps;
if (GROUP === "current") list = reps.filter((r) => r.current);
if (GROUP === "former") list = reps.filter((r) => !r.current);
if (OFFSET) list = list.slice(OFFSET);
if (MAX) list = list.slice(0, MAX);
console.log(`matches: total=${reps.length} processing=${list.length} group=${GROUP}`);

const stats = { reps: 0, created: 0, updated: 0, mediaUploaded: 0, mediaReused: 0, filesAttached: 0, photos: 0, failedFiles: 0 };
const failed: any[] = [];
async function upload(rel: string, alt: string): Promise<number | null> {
  const filename = `${crypto.createHash("sha1").update(rel).digest("hex").slice(0, 8)}-${slugifyBase(path.basename(rel))}`;
  const prefix = filename.slice(0, 8);
  let found = (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { equals: filename } } })).docs[0];
  if (!found) found = (await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { like: prefix } } })).docs[0];
  const media = found;
  if (media) { stats.mediaReused++; return media.id; }
  if (DRY) return 0;
  const tmpPath = path.join(TMP, filename);
  fs.copyFileSync(path.join(ROOT, rel), tmpPath);
  try { media = await payload.create({ collection: "media", data: { alt }, filePath: tmpPath }); stats.mediaUploaded++; return media.id; }
  catch (e: any) { failed.push({ rel, error: String(e?.message ?? e).slice(0, 120) }); return null; }
  finally { fs.unlinkSync(tmpPath); }
}

for (const r of list) {
  try {
    const existing = (await payload.find({ collection: "representatives", limit: 1, pagination: false, where: { name: { equals: r.clean } } })).docs[0];
    const files: any[] = [];
    for (const rep of reportsBy.get(r.clean) ?? []) {
      if (!rep?.file) continue;
      const rel = resolve(rep.file);
      if (!rel) { stats.failedFiles++; continue; }
      const id = await upload(rel, String(rep.name ?? path.basename(rel)).slice(0, 200));
      if (id) files.push({ file: id, title_hu: rep.name, title_en: rep.name });
    }
    const pictureRel = r.photo ? resolve(r.photo) : null;
    const pictureId = pictureRel ? await upload(pictureRel, r.clean) : undefined;
    if (pictureId) stats.photos++;

    const data: any = {
      name: r.clean,
      faculty: r.faculty,
      order: r.order,
      introduction: { text_hu: lexical(r.about ?? ""), text_en: lexical(r.about ?? "") },
      ...(r.current && r.pos ? { position: [{ position_hu: r.pos, position_en: r.pos }] } : {}),
      ...(r.current && r.emails?.length ? { emails: r.emails.map((email) => ({ email })) } : {}),
      ...(pictureId ? { picture: pictureId } : {}),
      ...(files.length ? { files } : {}),
    };
    if (DRY) { stats.reps++; continue; }
    if (existing) { await payload.update({ collection: "representatives", id: existing.id, data }); stats.updated++; }
    else { await payload.create({ collection: "representatives", data }); stats.created++; }
    stats.reps++; stats.filesAttached += files.length;
  } catch (e: any) { failed.push({ rep: r.clean, error: String(e?.message ?? e).slice(0, 160) }); }
  if (stats.reps % 10 === 0) console.log(`  ...${stats.reps}/${list.length} (media ${stats.mediaUploaded})`);
}
console.log("STATS:", JSON.stringify(stats));
if (failed.length) console.log("FAILED:", JSON.stringify(failed.slice(0, 15), null, 2));
process.exit(0);
