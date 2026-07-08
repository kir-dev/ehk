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
          {data.korok.map((kor: Organization) => (
            <OrganizationCard
              key={kor.id}
              name={kor.title}
              presentation={kor.description}
              socialLinks={kor.social_links}
              galleryImages={kor.images}
              imageBasePath="/ontevekenykorok"
              labels={{ contacts: getContactLabel(kor.social_title) }}
              locale={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
