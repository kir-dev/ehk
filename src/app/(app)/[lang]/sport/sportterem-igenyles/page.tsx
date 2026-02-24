import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import SportteremContent from './components/SportteremContent';
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
        <PageHeader title={dictionary.sport.sportterem.title} />
        <SportteremContent 
          content={dictionary.sport.sportterem} 
        />
      </div>
    </div>
  );
}