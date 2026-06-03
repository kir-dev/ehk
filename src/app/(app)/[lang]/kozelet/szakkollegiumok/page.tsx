import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import { getSocialIcon, getSocialPriority, getSocialName } from "@/lib/social-utils";

type Team = {
  id: string;
  title: string;
  description: string[];
  social_title: string;
  social_links: { label: string; url: string }[];
  images?: string[];
};

export default async function SzakkollegiumokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'advanced_colleges');
  const data = dictionary.advanced_colleges;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={data.title} />
        
        {/* Intro section, if any */}
        {data.description && data.description.length > 0 && (
          <Card className="mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg text-justify">
                {data.description.map((para: string) => (
                  <p key={para.substring(0, 32)}>{para}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-ehk-dark-red">{data.muszak.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg text-justify">
              {data.muszak.description.map((para: string) => (
                <p key={para.substring(0, 32)}>{para}</p>
              ))}
            </div>
            
            {data.muszak.images && data.muszak.images.length > 0 && (
              <div className="mt-8 mb-4 w-full bg-slate-50 flex items-center justify-center rounded-md overflow-hidden border border-slate-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/szakkollegium/${data.muszak.images[0]}`}
                  alt={data.muszak.title}
                  className="w-full h-auto max-h-[450px] object-contain"
                />
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <h3 className="font-semibold text-lg mb-4">{data.muszak.social_title}</h3>
              <div className="flex flex-wrap gap-3">
                {[...data.muszak.social_links]
                  .sort((a: {label: string, url: string}, b: {label: string, url: string}) => getSocialPriority(a.label) - getSocialPriority(b.label))
                  .map((link: {label: string, url: string}) => (
                  <Button
                    key={`muszak-link-${link.url}`}
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
          </CardContent>
        </Card>

        <div className="space-y-12">
          {data.teams.map((team: Team) => {
            const imageCount = team.images?.length || 0;
            let gridColsClass = 'grid-cols-1 md:grid-cols-3';
            if (imageCount === 1) {
              gridColsClass = 'grid-cols-1';
            } else if (imageCount === 2) {
              gridColsClass = 'grid-cols-1 md:grid-cols-2';
            }

            return (
              <Card key={team.id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-ehk-dark-red">
                    {team.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-justify mb-8">
                    {team.description.map((para: string) => (
                      <p key={para.substring(0, 32)}>{para}</p>
                    ))}
                  </div>

                  {/* Image Grid / Gallery */}
                  {team.images && team.images.length > 0 && (
                    <div className={`grid gap-4 mb-8 ${gridColsClass}`}>
                      {team.images.map((img: string, imgIdx: number) => {
                        let containerClass = 'aspect-square bg-slate-50 flex items-center justify-center p-4';
                        if (imageCount === 1) {
                          containerClass = 'bg-slate-50 flex items-center justify-center';
                        } else if (imageCount === 2) {
                          containerClass = 'aspect-square md:aspect-[4/3] bg-slate-50 flex items-center justify-center p-4';
                        }

                        return (
                          <div key={`img-${team.id}-${imgIdx}`} className={`relative w-full ${containerClass} rounded-md overflow-hidden border border-slate-100 shadow-sm`}>
                            {imageCount === 1 ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={`/szakkollegium/${img}`}
                                alt={`${team.title} - ${imgIdx + 1}`}
                                className="w-full h-auto max-h-[450px] object-contain"
                              />
                            ) : (
                              <Image
                                src={`/szakkollegium/${img}`}
                                alt={`${team.title} - ${imgIdx + 1}`}
                                fill
                                className="object-contain p-2"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <Separator className="mb-6" />
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">{team.social_title}</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-3">
                      {[...team.social_links]
                        .sort((a: {label: string, url: string}, b: {label: string, url: string}) => getSocialPriority(a.label) - getSocialPriority(b.label))
                        .map((link: {label: string, url: string}) => (
                        <Button
                          key={`link-${team.id}-${link.url}`}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
