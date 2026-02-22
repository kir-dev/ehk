import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getClubs } from "@/lib/payload-cms";
import { Media } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Clock, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { ClubsEmptyState } from "./components/ClubsEmptyState";

export default async function KlubokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const clubs = await getClubs();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title={dictionary.clubs.title} 
        />

        <Card className="max-w-4xl mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-center text-lg">
              {dictionary.clubs.description}
            </p>
          </CardContent>
        </Card>

        {clubs.length === 0 ? (
          <ClubsEmptyState
            title={dictionary.clubs.no_results}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
            {clubs.map((club) => {
              const coverImage = club.image as Media;

            const cardContent = (
              <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow bg-white">
                {coverImage ? (
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
                    <CardTitle className="text-2xl group-hover:text-ehk-dark-red transition-colors">{club.title}</CardTitle>
                    {club.link && <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-ehk-dark-red transition-colors shrink-0 mt-1" />}
                  </div>
                  
                  {(club.location || (club.openingHours && (club.openingHours[`text_${lang}`]))) && (
                    <CardDescription className="flex flex-col gap-2 mt-2">
                      {club.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {club.location}
                        </span>
                      )}
                      {club.openingHours && club.openingHours[`text_${lang}`] && (
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                          <div className="prose prose-sm max-w-none dark:prose-invert leading-tight">
                            <RichText data={club.openingHours[`text_${lang}`] as any} />
                          </div>
                        </div>
                      )}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="flex-1 text-muted-foreground">
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    {club.description && club.description[`text_${lang}`] && (
                      <RichText
                        data={club.description[`text_${lang}`] as any}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            );

            return (
              <div key={club.id} className="h-full">
                {club.link ? (
                  <a href={club.link as string} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
