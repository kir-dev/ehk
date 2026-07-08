import {
  OrganizationCard,
  type OrganizationCardProps,
} from "@/components/common/OrganizationCard";
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
  stats?: OrganizationCardProps["stats"];
  events?: OrganizationCardProps["events"];
  activities?: OrganizationCardProps["activities"];
  departments?: OrganizationCardProps["departments"];
  target_audience?: OrganizationCardProps["targetAudience"];
  targetAudience?: OrganizationCardProps["targetAudience"];
  join_url?: string;
  joinUrl?: string;
  join_text?: string;
  joinText?: string;
};

function getContactLabel(label: string) {
  return label.replace(/:$/, "");
}

function getOrganizationCardProps(
  organization: Organization,
  locale: Locale,
  imageBasePath: string,
): OrganizationCardProps {
  return {
    name: organization.title,
    stats: organization.stats,
    presentation: organization.description,
    events: organization.events,
    activities: organization.activities,
    departments: organization.departments,
    targetAudience:
      organization.targetAudience ?? organization.target_audience,
    socialLinks: organization.social_links,
    galleryImages: organization.images,
    imageBasePath,
    joinUrl: organization.joinUrl ?? organization.join_url,
    joinText: organization.joinText ?? organization.join_text,
    labels: { contacts: getContactLabel(organization.social_title) },
    locale,
  };
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
            {...getOrganizationCardProps(
              data.muszak as Organization,
              lang,
              "/szakkollegium",
            )}
          />

          {(data.teams as Organization[]).map((team) => (
            <OrganizationCard
              key={team.id}
              {...getOrganizationCardProps(team, lang, "/szakkollegium")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
