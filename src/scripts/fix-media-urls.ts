import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });
const all = await payload.find({ collection: "media", limit: 0, pagination: false });
let updated = 0;
const bad: any[] = [];
for (const doc of all.docs as any[]) {
  if (!doc.filename) continue;
  const want = "/api/media/file/" + encodeURI(doc.filename);
  if (doc.url === want) continue;
  try {
    await payload.update({ collection: "media", id: doc.id, data: { url: want } });
    updated++;
  } catch (e: any) {
    bad.push({ id: doc.id, filename: doc.filename, error: String(e?.message ?? e).slice(0, 160) });
  }
}
console.log("MEDIA_TOTAL:", all.docs.length, "URL_UPDATED:", updated);
if (bad.length) console.log("FAILED:", JSON.stringify(bad.slice(0, 10), null, 2));
process.exit(0);
