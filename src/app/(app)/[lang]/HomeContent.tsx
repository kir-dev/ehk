"use client"

import { useState, useTransition, useCallback, useRef } from "react"
import Switcher from "@/app/(app)/components/Switcher"
import NewsFilter from "@/app/(app)/components/NewsFilter"
import EventsSection from "@/app/(app)/components/EventsSection"
import NewsCard from "@/components/news/NewsCard"
import NewsPagination from "@/components/news/NewsPagination"
import { EmptyState } from "@/components/common/EmptyState"
import { fetchNewsAction, type NewsResult } from "./actions"
import type { Event } from "@/payload-types"

type Props = {
  lang: "hu" | "en"
  dictionary: Record<string, Record<string, string>>
  initialNewsData: NewsResult
  eventsAll: Event[]
  initialTab: "news" | "events"
  initialTags: string[]
}

export default function HomeContent({
  lang,
  dictionary,
  initialNewsData,
  eventsAll,
  initialTab,
  initialTags,
}: Props) {
  const [activeTab, setActiveTab] = useState<"news" | "events">(initialTab)
  const [activeTags, setActiveTags] = useState<string[]>(initialTags)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [newsData, setNewsData] = useState<NewsResult>(initialNewsData)
  const [isPending, startTransition] = useTransition()
  const requestIdRef = useRef(0)

  const scrollToNewsSection = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const headers = Array.from(
          document.querySelectorAll('[data-hirek-header="true"]')
        ) as HTMLElement[]
        const visible = headers.find((h) => {
          const style = window.getComputedStyle(h)
          if (style.display === "none" || style.visibility === "hidden") return false
          const rect = h.getBoundingClientRect()
          return rect.width > 0 && rect.height > 0 && !!h.offsetParent
        })
        visible?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    })
  }, [])

  const refreshNews = useCallback(
    (page: number, tags: string[]) => {
      const requestId = ++requestIdRef.current
      startTransition(async () => {
        const data = await fetchNewsAction(page, tags)
        if (requestId === requestIdRef.current) {
          setNewsData(data)
        }
      })
    },
    []
  )

  const handleTagClick = useCallback(
    (tag: string) => {
      const nextTags = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag]
      setActiveTags(nextTags)
      refreshNews(1, nextTags)
    },
    [activeTags, refreshNews]
  )

  const handleClearFilters = useCallback(() => {
    setActiveTags([])
    refreshNews(1, [])
  }, [refreshNews])

  const handlePageChange = useCallback(
    (page: number) => {
      refreshNews(page, activeTags)
      scrollToNewsSection()
    },
    [activeTags, refreshNews, scrollToNewsSection]
  )

  const activeTagString = activeTags.length > 0 ? activeTags.join(",") : undefined

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Switcher
          activeTab={activeTab}
          newsCount={newsData.totalDocs}
          eventsCount={eventsAll.length}
          newsTitle={dictionary.news?.title ?? "Hírek"}
          eventsTitle={dictionary.rendezvenyek?.title ?? "Rendezvények"}
          onTabChange={setActiveTab}
        />

        {activeTab === "news" && (
          <NewsFilter
            activeTags={activeTags}
            isOpen={isFilterOpen}
            onToggleOpen={() => setIsFilterOpen((o) => !o)}
            onTagClick={handleTagClick}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>

      {activeTab === "news" ? (
        <div
          className={`flex flex-col w-full animate-in fade-in duration-300 transition-opacity${
            isPending ? " opacity-50 pointer-events-none" : ""
          }`}
        >
          <div data-hirek-header="true" className="bg-[#862633] text-white pt-5 pb-10 px-6 md:px-8 -mx-6 md:-mx-8 relative z-0">
            <h2 className="text-xl md:text-2xl font-playfair font-bold tracking-wide">
              {dictionary.widgets?.fresh_news}
            </h2>
          </div>

          <div className="-mt-6 relative z-10">
            {newsData.docs.length === 0 ? (
              <EmptyState
                title={dictionary.news?.no_results}
                description={dictionary.news?.no_news_category}
              />
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 pb-4 lg:grid-cols-3 gap-4 md:gap-6">
                  {newsData.docs.map((item) => (
                    <NewsCard
                      key={item.id}
                      news={item}
                      activeTag={activeTagString}
                      onTagClick={handleTagClick}
                    />
                  ))}
                </div>
                <NewsPagination
                  currentPage={newsData.page}
                  totalPages={newsData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full animate-in fade-in duration-300">
          <div className="relative z-10">
            <EventsSection lang={lang} events={eventsAll} dictionary={dictionary} />
          </div>
        </div>
      )}
    </>
  )
}
