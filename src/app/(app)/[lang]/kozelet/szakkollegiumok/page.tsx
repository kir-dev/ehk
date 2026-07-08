import { OrganizationCard } from "@/components/common/OrganizationCard";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

type Organization = {
  id: string;
  title: string;
  description: string[];
  social_title: string;
  social_links: { label: string; url: string }[];
  images?: string[];
};

function getContactLabel(label: string) {
  return label.replace(/:$/, "");
}

export default async function SzakkollegiumokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "advanced_colleges");
  const data = dictionary.advanced_colleges;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 py-8 md:px-4">
        <PageHeader title={data.title} />

        {data.description && data.description.length > 0 && (
          <Card className="mx-auto mb-12 border-slate-200/60 bg-white/50 shadow-sm backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-4 text-justify text-lg leading-relaxed text-gray-700">
                {data.description.map((paragraph: string) => (
                  <p key={paragraph.substring(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-12">
          <OrganizationCard
            name={data.muszak.title}
            presentation={data.muszak.description}
            socialLinks={data.muszak.social_links}
            galleryImages={data.muszak.images}
            imageBasePath="/szakkollegium"
            labels={{ contacts: getContactLabel(data.muszak.social_title) }}
            locale={lang}
          />

          {data.teams.map((team: Organization) => (
            <OrganizationCard
              key={team.id}
              name={team.title}
              presentation={team.description}
              socialLinks={team.social_links}
              galleryImages={team.images}
              imageBasePath="/szakkollegium"
              labels={{ contacts: getContactLabel(team.social_title) }}
              locale={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
