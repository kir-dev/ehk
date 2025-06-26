import { News } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getNews(): Promise<News[]> {
  const payload = await getPayload({ config });
  const groups = await payload.find({
    collection: "news",
    limit: 1000,
    sort: "order",
  });

  return groups.docs as News[];
}
