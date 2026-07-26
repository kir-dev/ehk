export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getStudentClubs } from "@/lib/payload-cms";
import { notFound } from "next/navigation";

import { StudentClubCard } from "./StudentClubCard";

export default async function StudentClubsPage({
  params,
}: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const [dictionary, clubs] = await Promise.all([
    getDictionary(locale, "ontevekeny_korok"),
    getStudentClubs(),
  ]);
  const content = dictionary.ontevekeny_korok;

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <PageHeader title={content.title} subtitle={content.subtitle} />

        <main className="space-y-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
          {clubs.map((club) => (
            <StudentClubCard key={club.id} club={club} locale={locale} />
          ))}
        </main>
      </div>
    </div>
  );
}
