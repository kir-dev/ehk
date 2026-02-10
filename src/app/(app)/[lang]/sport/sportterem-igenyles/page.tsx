import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { PageHeader } from '@/components/common/PageHeader';
import SportteremContent from './components/SportteremContent';
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
        <main className="container mx-auto py-10 px-4">
          <SportteremContent 
            content={dictionary.sport.sportterem} 
          />
        </main>
      </div>
    </div>
  );
}