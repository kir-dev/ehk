import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import GymSupportContent from './components/GymSupportContent';
import { PageHeader } from '@/components/common/PageHeader';
type SportpalyaTamogatasPageProps = {
  params: Promise<{ lang: Locale }>;
};
export default async function SportpalyaTamogatasPage({
  params,
}: SportpalyaTamogatasPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-8">
          <PageHeader title={dictionary.sport.sportpalyaTamogatas.title} />
          <GymSupportContent 
            content={dictionary.sport.sportpalyaTamogatas} 
          />
      </div>
    </div>
  );
}