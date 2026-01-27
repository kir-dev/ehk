import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { PageHeader } from '@/components/common/PageHeader';
type SportteremIgenylesPageProps = {
  params: Promise<{ lang: Locale }>;
};
export default async function SportteremIgenylesPage({
  params,
}: SportteremIgenylesPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={lang === 'hu' ? 'Sportterem Igénylés' : 'Gym Reservation'}
          description={lang === 'hu' ? 'Sportterem igénylésével kapcsolatos információk.' : 'Information about gym reservations.'}
        />
        <main className="container mx-auto py-10 px-4">
          {/* TODO: Add SportteremContent component or form here */}
          <p className="text-gray-600">
            {lang === 'hu' ? 'A tartalom hamarosan elérhető lesz.' : 'Content coming soon.'}
          </p>
        </main>
      </div>
    </div>
  );
}