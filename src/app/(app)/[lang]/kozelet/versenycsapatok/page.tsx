import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { 
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Link as LinkIcon,
  MessageCircle
} from "lucide-react";
import Image from "next/image";

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function XSocialIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
    </svg>
  );
}

function getSocialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('facebook')) return <Facebook className="h-4 w-4" />;
  if (l.includes('instagram')) return <Instagram className="h-4 w-4" />;
  if (l.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
  if (l.includes('youtube')) return <Youtube className="h-4 w-4" />;
  if (l.includes('tiktok')) return <TiktokIcon className="h-4 w-4" />;
  if (l === 'x' || l.includes('twitter')) return <XSocialIcon className="h-4 w-4" />;
  if (l.includes('linktr.ee')) return <LinkIcon className="h-4 w-4" />;
  if (l.includes('threads')) return <MessageCircle className="h-4 w-4" />;
  if (l.includes('weblap') || l.includes('web') || l.includes('honlap') || l.includes('mvk.bme.hu')) return <Globe className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}

function getSocialPriority(label: string) {
  const l = label.toLowerCase();
  if (l.includes('weblap') || l.includes('web') || l.includes('honlap') || l.includes('mvk.bme.hu')) return 1;
  if (l.includes('facebook')) return 2;
  if (l.includes('instagram')) return 3;
  if (l.includes('linkedin')) return 4;
  if (l.includes('youtube')) return 5;
  if (l === 'x' || l.includes('twitter')) return 6;
  if (l.includes('tiktok')) return 7;
  if (l.includes('threads')) return 8;
  if (l.includes('linktr.ee')) return 9;
  return 10;
}

type Team = {
  id: string;
  title: string;
  description: string[];
  social_title: string;
  social_links: { label: string; url: string }[];
  images?: string[];
};

export default async function VersenycsapatokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const data = dictionary.competition_teams;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={data.title} />

        <Card className="mx-auto mb-12 bg-white/50 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-ehk-dark-red">{data.mvk.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg text-justify">
              {data.mvk.description.map((para: string, idx: number) => (
                <p key={`mvk-p-${idx}`}>{para}</p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <h3 className="font-semibold text-lg mb-4">{data.mvk.social_title}</h3>
              <div className="flex flex-wrap gap-3">
                {[...data.mvk.social_links]
                  .sort((a: {label: string, url: string}, b: {label: string, url: string}) => getSocialPriority(a.label) - getSocialPriority(b.label))
                  .map((link: {label: string, url: string}, idx: number) => (
                  <Button
                    key={`mvk-link-${idx}`}
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
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-12">
          {data.teams.map((team: Team) => (
            <Card key={team.id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-ehk-dark-red">
                  {team.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-justify mb-8">
                  {team.description.map((para: string, pIdx: number) => (
                    <p key={`p-${team.id}-${pIdx}`}>{para}</p>
                  ))}
                </div>

                {/* Image Grid / Gallery */}
                {team.images && team.images.length > 0 && (
                  <div className={`grid gap-1 mb-8 bg-slate-100 ${
                    team.images.length === 1 ? 'grid-cols-1 h-64 md:h-96' : 
                    team.images.length === 2 ? 'grid-cols-2 h-48 md:h-72' : 
                    'grid-cols-1 md:grid-cols-3 h-auto md:h-64'
                  }`}>
                    {team.images.map((img: string, imgIdx: number) => (
                      <div key={`img-${team.id}-${imgIdx}`} className={`relative w-full ${team.images!.length >= 3 ? 'h-48 md:h-full' : 'h-full'}`}>
                        <Image
                          src={`/versenycsapatok/${img}`}
                          alt={`${team.title} image ${imgIdx + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator className="mb-6" />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">{team.social_title}</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-3">
                    {[...team.social_links]
                      .sort((a: {label: string, url: string}, b: {label: string, url: string}) => getSocialPriority(a.label) - getSocialPriority(b.label))
                      .map((link: {label: string, url: string}, lIdx: number) => (
                      <Button
                        key={`link-${team.id}-${lIdx}`}
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
                          {link.label}
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
