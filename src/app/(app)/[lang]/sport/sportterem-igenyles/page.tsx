import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import SportteremContent from './components/SportteremContent';
import { PageHeader } from '@/components/common/PageHeader';
import { parseFormattedText } from '@/utils/parseFormattedText';

type SportteremIgenylesPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function SportteremIgenylesPage({
  params,
}: SportteremIgenylesPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, 'sport');
  const content = dictionary.sport.sportterem;

  return (
    <div className="min-h-screen bg-[#f9f4f0]">
      <div className="container mx-auto max-w-5xl px-3 py-6 md:px-8 md:py-8">
        <PageHeader
          title={content.title}
          subtitle={parseFormattedText(content.description)}
        />
        <SportteremContent content={content} />
      </div>
    </div>
  );
}
