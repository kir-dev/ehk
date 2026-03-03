import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getClubs } from "@/lib/payload-cms";
import { Media } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Clock, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { ClubsEmptyState } from "./components/ClubsEmptyState";

function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function KlubokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  
  // async-parallel: Parallelize data fetching
  const [dictionary, clubs] = await Promise.all([
    getDictionary(lang),
    getClubs(),
  ]);

  const title = dictionary.clubs.title;

  // js-early-exit: Handle empty state with an early return
  if (clubs.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <PageHeader title={title} />
          <ClubsEmptyState title={dictionary.clubs.no_results} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={title} />

        <Card className="mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-center text-lg">
              {dictionary.clubs.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {clubs.map((club) => {
            // Safe check for the populated relation (it might occasionally be an ID or null)
            const coverImage = typeof club.image === "object" && club.image !== null ? (club.image as Media) : null;
            const openingHoursData = club.openingHours?.[`text_${lang}`];
            const descriptionData = club.description?.[`text_${lang}`];

            const cardContent = (
              <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow bg-white">
                {coverImage?.url ? (
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={coverImage.url || ""}
                      alt={coverImage.alt || club.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">
                    <span className="text-muted-foreground">{dictionary.common.loading}</span>
                  </div>
                )}

                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-2xl group-hover:text-ehk-dark-red transition-colors">
                      {club.title}
                    </CardTitle>
                    {club.link && isValidUrl(club.link) ? (
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-ehk-dark-red transition-colors shrink-0 mt-1" />
                    ) : null}
                  </div>
                  
                  {club.location || openingHoursData ? (
                    <CardDescription className="flex flex-col gap-2 mt-2">
                      {club.location ? (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {club.location}
                        </span>
                      ) : null}
                      {openingHoursData ? (
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                          <div className="prose prose-sm max-w-none dark:prose-invert leading-tight">
                            <RichText data={openingHoursData as unknown as SerializedEditorState} />
                          </div>
                        </div>
                      ) : null}
                    </CardDescription>
                  ) : null}
                </CardHeader>

                <CardContent className="flex-1 text-muted-foreground">
                  {descriptionData ? (
                    <>
                      <Separator className="mb-4" />
                      <div className="prose dark:prose-invert prose-sm max-w-none">
                        <RichText data={descriptionData as unknown as SerializedEditorState} />
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            );

            return (
              <div key={club.id} className="h-full">
                {club.link && isValidUrl(club.link) ? (
                  <a 
                    href={club.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
