"use server"

import { getNews } from "@/lib/payload-cms"
import type { News } from "@/payload-types"

export interface NewsResult {
  docs: News[]
  totalDocs: number
  totalPages: number
  page: number
}

export async function fetchNewsAction(page: number, tags: string[]): Promise<NewsResult> {
  return getNews({
    page,
    limit: 6,
    tag: tags.length > 0 ? tags.join(",") : undefined,
  })
}
