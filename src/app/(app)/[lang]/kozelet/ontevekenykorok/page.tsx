import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import { getSocialIcon, getSocialPriority, getSocialName } from "@/lib/social-utils";

type Kor = {
  id: string;
  title: string;
  description: string[];
  social_title: string;
  social_links: { label: string; url: string }[];
  images?: string[];
};

export default async function OntevekenyKorokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const data = dictionary.ontevekeny_korok;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <PageHeader title={data.title} />

        <div className="space-y-12">
          {data.korok.map((kor: Kor) => (
            <Card key={kor.id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-ehk-dark-red">
                  {kor.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-justify mb-8">
                  {kor.description.map((para: string, pIdx: number) => (
                    <p key={`p-${kor.id}-${pIdx}`}>{para}</p>
                  ))}
                </div>

                {/* Image Grid / Gallery */}
                {kor.images && kor.images.length > 0 && (
                  <div className={`grid gap-4 mb-8 ${
                    kor.images.length === 1 ? 'grid-cols-1' : 
                    kor.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                    'grid-cols-1 md:grid-cols-3'
                  }`}>
                    {kor.images.map((img: string, imgIdx: number) => (
                      <div key={`img-${kor.id}-${imgIdx}`} className={`relative w-full ${kor.images!.length === 1 ? 'bg-slate-50 flex items-center justify-center' : kor.images!.length === 2 ? 'aspect-square md:aspect-[4/3] bg-slate-50 flex items-center justify-center p-4' : 'aspect-square bg-slate-50 flex items-center justify-center p-4'} rounded-md overflow-hidden border border-slate-100 shadow-sm`}>
                        {kor.images!.length === 1 ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={`/ontevekenykorok/${img}`}
                            alt={`${kor.title} image ${imgIdx + 1}`}
                            className="w-full h-auto max-h-[450px] object-contain"
                          />
                        ) : (
                          <Image
                            src={`/ontevekenykorok/${img}`}
                            alt={`${kor.title} image ${imgIdx + 1}`}
                            fill
                            className="object-contain p-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator className="mb-6" />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">{kor.social_title}</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-3">
                    {[...kor.social_links]
                      .sort((a: {label: string, url: string}, b: {label: string, url: string}) => getSocialPriority(a.label) - getSocialPriority(b.label))
                      .map((link: {label: string, url: string}, lIdx: number) => (
                      <Button
                        key={`link-${kor.id}-${lIdx}`}
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
          ))}
        </div>
      </div>
    </div>
  );
}
