import React from "react"
import { EhkEvent, Event, Media } from "@/payload-types"
import Calendar from "@/app/(app)/components/Calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getSocialIcon, getSocialPriority, getSocialName } from "@/lib/social-utils"

// Helper to check if URL is valid
function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

type Props = {
  lang: "hu" | "en"
  ehkEvents: EhkEvent[]
  calendarEvents: Event[]
  dictionary: Record<string, unknown>
}

export default function EventsSection({ lang, ehkEvents, calendarEvents, dictionary }: Readonly<Props>) {
  const rendezvenyek = dictionary.rendezvenyek as Record<string, string> | undefined
  const noEventsText = rendezvenyek?.no_results || "Jelenleg nincsenek elérhető rendezvények."
  const moreInfoText = lang === 'en' ? 'More information:' : 'További információk:'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_18.75rem] gap-8 items-start w-full">
      {/* Left Column: EhkEvent list */}
      <div className="space-y-6 order-2 lg:order-1 min-w-0">
        {ehkEvents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-white border border-[#e9e2d6] rounded-lg">
            {noEventsText}
          </div>
        ) : (
          ehkEvents.map((event) => {
            const descriptionData = event.description?.[`text_${lang}`]
            const images = event.images || []
            const firstImage = images[0]?.image as Media | undefined

            return (
              <Card key={event.id} className="overflow-hidden bg-white border border-[#e9e2d6] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {firstImage?.url && (
                  <div className="relative w-full h-50 bg-slate-50 border-b border-[#e9e2d6] overflow-hidden">
                    <Image
                      src={firstImage.url}
                      alt={firstImage.alt || event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-playfair font-bold text-[#862633]">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {descriptionData && (
                    <div className="space-y-4 text-[#3d3d3d] text-sm leading-relaxed text-justify mb-6 prose dark:prose-invert max-w-none richtext">
                      <RichText data={descriptionData} />
                    </div>
                  )}

                  {images.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {images.slice(1).map((imgObj, idx) => {
                        const nextImg = imgObj.image as Media | undefined
                        if (!nextImg?.url) return null
                        return (
                          <div key={idx} className="relative aspect-video rounded-md overflow-hidden border border-slate-100 bg-slate-50">
                            <Image
                              src={nextImg.url}
                              alt={nextImg.alt || `${event.title} detail`}
                              fill
                              className="object-cover"
                              sizes="200px"
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {event.links && event.links.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3">
                        {moreInfoText}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[...event.links]
                          .filter((link) => isValidUrl(link.url))
                          .sort((a, b) => getSocialPriority(a.label) - getSocialPriority(b.label))
                          .map((link, lIdx) => (
                            <Button
                              key={lIdx}
                              variant="outline"
                              size="sm"
                              className="rounded-full gap-1.5 hover:bg-slate-100 hover:text-[#862633] transition-colors h-8 text-xs font-open-sans"
                              asChild
                            >
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getSocialIcon(link.label)}
                                {getSocialName(link.label, lang)}
                              </a>
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Right Column: Interactive Calendar */}
      <div className="order-1 lg:order-2 space-y-4 lg:sticky lg:top-24 w-full">
        <div className="bg-[#fffefc] border border-[#e9e2d6] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <Calendar events={calendarEvents} className="w-full max-w-full h-auto [&_.rdp]:text-sm" />
        </div>
      </div>
    </div>
  )
}
