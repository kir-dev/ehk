import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import GymSupportContent from './components/GymSupportContent';
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
      <div className="container mx-auto px-4 py-8">
        <main className="container mx-auto py-10 px-4">
          <GymSupportContent 
            content={dictionary.sport.sportpalyaTamogatas} 
          />
        </main>
      </div>
    </div>
  );
}