export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getCompetitiveTeams } from "@/lib/payload-cms";
import { notFound } from "next/navigation";

import { CompetitiveTeamCard } from "./CompetitiveTeamCard";

export default async function CompetitiveTeamsPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const [dictionary, teams] = await Promise.all([
    getDictionary(locale, "competition_teams"),
    getCompetitiveTeams(),
  ]);
  const content = dictionary.competition_teams;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <PageHeader title={content.title} subtitle={content.subtitle} />

        <main className="space-y-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          {teams.map((team) => (
            <CompetitiveTeamCard
              key={team.id}
              team={team}
              locale={locale}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
