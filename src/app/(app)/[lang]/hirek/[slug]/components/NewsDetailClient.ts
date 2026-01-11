"use client"

import { News } from "@/payload-types"

export interface NewsDetailClientProps {
  article: News
}

// Re-export components for potential individual usage if needed
export { NewsDetailMain } from "./NewsDetailMain"
export { NewsDetailSidebar } from "./NewsDetailSidebar"

// Keeping the original names if they were used elsewhere, though they likely weren't exported individually before.
// But we should export the "Main" and "Sidebar" logic as distinct components now.

// Refactoring: The original file exported `NewsDetailClientMain` and `NewsDetailClientSidebar`.
// We should maintain these exports to avoid breaking changes if they are imported elsewhere.

export { NewsDetailMain as NewsDetailClientMain } from "./NewsDetailMain"
export { NewsDetailSidebar as NewsDetailClientSidebar } from "./NewsDetailSidebar"

