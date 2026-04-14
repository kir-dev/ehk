import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getEhkEvents } from "@/lib/payload-cms";
import { Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getSocialIcon, getSocialPriority, getSocialName } from "@/lib/social-utils";
import Image from "next/image";

function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function RendezvenyekPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  
  const [dictionary, events] = await Promise.all([
    getDictionary(lang),
    getEhkEvents(),
  ]);

  const title = dictionary.rendezvenyek?.title || "Rendezvények";

  if (events.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-2 md:px-4 py-8">
          <PageHeader title={title} />
          <div className="text-center py-12 text-muted-foreground">
            {dictionary.rendezvenyek?.no_results || "Jelenleg nincsenek elérhető rendezvények."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={title} />

        {dictionary.rendezvenyek?.description && (
          <Card className="mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-center text-lg">
                {dictionary.rendezvenyek.description}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-12">
          {events.map((event) => {
            const descriptionData = event.description?.[`text_${lang}`];
            const images = event.images || [];

            return (
              <Card key={event.id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-2xl text-ehk-dark-red">
                      {event.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {descriptionData ? (
                    <div className="space-y-4 text-muted-foreground leading-relaxed text-justify mb-8 prose dark:prose-invert max-w-none">
                      <RichText data={descriptionData as unknown as SerializedEditorState} />
                    </div>
                  ) : null}

                  {images.length > 0 && (
                    <div className={`grid gap-4 mb-8 ${
                      images.length === 1 ? 'grid-cols-1' : 
                      images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                      'grid-cols-1 md:grid-cols-3'
                    }`}>
                      {images.map((imgObj, imgIdx) => {
                        const coverImage = typeof imgObj.image === "object" && imgObj.image !== null ? (imgObj.image as Media) : null;
                        if (!coverImage?.url) return null;
                        
                        return (
                          <div key={`img-${event.id}-${imgIdx}`} className={`relative w-full ${images.length === 1 ? 'bg-slate-50 flex items-center justify-center' : images.length === 2 ? 'aspect-square md:aspect-[4/3] bg-slate-50 flex items-center justify-center p-4' : 'aspect-square bg-slate-50 flex items-center justify-center p-4'} rounded-md overflow-hidden border border-slate-100 shadow-sm`}>
                            {images.length === 1 ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={coverImage.url}
                                alt={coverImage.alt || `${event.title} image ${imgIdx + 1}`}
                                className="w-full h-auto max-h-[450px] object-contain"
                              />
                            ) : (
                              <Image
                                src={coverImage.url}
                                alt={coverImage.alt || `${event.title} image ${imgIdx + 1}`}
                                fill
                                className="object-contain p-2"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {event.links && event.links.length > 0 && (
                    <div>
                      <Separator className="mb-6" />
                      <h4 className="font-medium text-gray-900 mb-3">
                        {lang === 'hu' ? 'További információk:' : 'More information:'}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-3">
                        {[...event.links]
                          .filter((link) => isValidUrl(link.url))
                          .sort((a, b) => getSocialPriority(a.label) - getSocialPriority(b.label))
                          .map((link, lIdx) => (
                          <Button
                            key={`link-${event.id}-${lIdx}`}
                            variant="outline"
                            className="rounded-full gap-2 hover:bg-slate-100 hover:text-ehk-dark-red transition-colors"
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
