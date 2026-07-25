import {
  OrganizationCard,
  type OrganizationCardProps,
} from "@/components/common/OrganizationCard";
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
    imageBasePath: "/ontevekenykorok",
    joinUrl: organization.joinUrl ?? organization.join_url,
    joinText: organization.joinText ?? organization.join_text,
    labels: { contacts: getContactLabel(organization.social_title) },
    locale,
  };
}

export default async function OntevekenyKorokPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "ontevekeny_korok");
  const data = dictionary.ontevekeny_korok;

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 py-8 md:px-4">
        <PageHeader title={data.title} />

        <div className="space-y-12">
          {(data.korok as Organization[]).map((kor) => (
            <OrganizationCard
              key={kor.id}
              {...getOrganizationCardProps(kor, lang)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
