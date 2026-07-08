import { OrganizationCard } from "@/components/common/OrganizationCard";
import { PageHeader } from "@/components/common/PageHeader";
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

export default async function VersenycsapatokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "competition_teams");
  const data = dictionary.competition_teams;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 py-8 md:px-4">
        <PageHeader title={data.title} />

        <div className="space-y-12">
          <OrganizationCard
            name={data.mvk.title}
            presentation={data.mvk.description}
            socialLinks={data.mvk.social_links}
            labels={{ contacts: getContactLabel(data.mvk.social_title) }}
            locale={lang}
          />

          {data.teams.map((team: Organization) => (
            <OrganizationCard
              key={team.id}
              name={team.title}
              presentation={team.description}
              socialLinks={team.social_links}
              galleryImages={team.images}
              imageBasePath="/versenycsapatok"
              labels={{ contacts: getContactLabel(team.social_title) }}
              locale={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
