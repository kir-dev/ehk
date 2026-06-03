import 'server-only'
import type { Locale } from './i18n-config'

export type Namespace =
  | 'common'
  | 'scholarships'
  | 'regulations'
  | 'news'
  | 'representatives'
  | 'permissions'
  | 'sport'
  | 'knowledge_base'
  | 'dormitories'
  | 'dormitory_details'
  | 'ontevekeny_korok'
  | 'competition_teams'
  | 'advanced_colleges'
  | 'clubs'
  | 'international_general'
  | 'international_education'
  | 'international_application'
  | 'international_dormitory'
  | 'international_mobility'
  | 'erasmus'
  | 'eelisa'
  | 'language_education';

export type DictionaryMap = {
  common: typeof import('./dictionaries/hu/common.json');
  scholarships: typeof import('./dictionaries/hu/scholarships.json');
  regulations: typeof import('./dictionaries/hu/regulations.json');
  news: typeof import('./dictionaries/hu/news.json');
  representatives: typeof import('./dictionaries/hu/representatives.json');
  permissions: typeof import('./dictionaries/hu/permissions.json');
  sport: typeof import('./dictionaries/hu/sport.json');
  knowledge_base: typeof import('./dictionaries/hu/knowledge_base.json');
  dormitories: typeof import('./dictionaries/hu/dormitories.json');
  dormitory_details: typeof import('./dictionaries/hu/dormitory_details.json');
  ontevekeny_korok: typeof import('./dictionaries/hu/ontevekeny_korok.json');
  competition_teams: typeof import('./dictionaries/hu/competition_teams.json');
  advanced_colleges: typeof import('./dictionaries/hu/advanced_colleges.json');
  clubs: typeof import('./dictionaries/hu/clubs.json');
  international_general: typeof import('./dictionaries/hu/international_general.json');
  international_education: typeof import('./dictionaries/hu/international_education.json');
  international_application: typeof import('./dictionaries/hu/international_application.json');
  international_dormitory: typeof import('./dictionaries/hu/international_dormitory.json');
  international_mobility: typeof import('./dictionaries/hu/international_mobility.json');
  erasmus: typeof import('./dictionaries/hu/erasmus.json');
  eelisa: typeof import('./dictionaries/hu/eelisa.json');
  language_education: typeof import('./dictionaries/hu/language_education.json');
}

const load = <K extends Namespace>(
  promise: Promise<unknown>
): Promise<DictionaryMap[K]> => {
  return promise.then((m) => (m as { default: DictionaryMap[K] }).default);
}

const loaders: Record<Locale, { [K in Namespace]: () => Promise<DictionaryMap[K]> }> = {
  hu: {
    common: () => load<'common'>(import('./dictionaries/hu/common.json')),
    scholarships: () => load<'scholarships'>(import('./dictionaries/hu/scholarships.json')),
    regulations: () => load<'regulations'>(import('./dictionaries/hu/regulations.json')),
    news: () => load<'news'>(import('./dictionaries/hu/news.json')),
    representatives: () => load<'representatives'>(import('./dictionaries/hu/representatives.json')),
    permissions: () => load<'permissions'>(import('./dictionaries/hu/permissions.json')),
    sport: () => load<'sport'>(import('./dictionaries/hu/sport.json')),
    knowledge_base: () => load<'knowledge_base'>(import('./dictionaries/hu/knowledge_base.json')),
    dormitories: () => load<'dormitories'>(import('./dictionaries/hu/dormitories.json')),
    dormitory_details: () => load<'dormitory_details'>(import('./dictionaries/hu/dormitory_details.json')),
    ontevekeny_korok: () => load<'ontevekeny_korok'>(import('./dictionaries/hu/ontevekeny_korok.json')),
    competition_teams: () => load<'competition_teams'>(import('./dictionaries/hu/competition_teams.json')),
    advanced_colleges: () => load<'advanced_colleges'>(import('./dictionaries/hu/advanced_colleges.json')),
    clubs: () => load<'clubs'>(import('./dictionaries/hu/clubs.json')),
    international_general: () => load<'international_general'>(import('./dictionaries/hu/international_general.json')),
    international_education: () => load<'international_education'>(import('./dictionaries/hu/international_education.json')),
    international_application: () => load<'international_application'>(import('./dictionaries/hu/international_application.json')),
    international_dormitory: () => load<'international_dormitory'>(import('./dictionaries/hu/international_dormitory.json')),
    international_mobility: () => load<'international_mobility'>(import('./dictionaries/hu/international_mobility.json')),
    erasmus: () => load<'erasmus'>(import('./dictionaries/hu/erasmus.json')),
    eelisa: () => load<'eelisa'>(import('./dictionaries/hu/eelisa.json')),
    language_education: () => load<'language_education'>(import('./dictionaries/hu/language_education.json')),
  },
  en: {
    common: () => load<'common'>(import('./dictionaries/en/common.json')),
    scholarships: () => load<'scholarships'>(import('./dictionaries/en/scholarships.json')),
    regulations: () => load<'regulations'>(import('./dictionaries/en/regulations.json')),
    news: () => load<'news'>(import('./dictionaries/en/news.json')),
    representatives: () => load<'representatives'>(import('./dictionaries/en/representatives.json')),
    permissions: () => load<'permissions'>(import('./dictionaries/en/permissions.json')),
    sport: () => load<'sport'>(import('./dictionaries/en/sport.json')),
    knowledge_base: () => load<'knowledge_base'>(import('./dictionaries/en/knowledge_base.json')),
    dormitories: () => load<'dormitories'>(import('./dictionaries/en/dormitories.json')),
    dormitory_details: () => load<'dormitory_details'>(import('./dictionaries/en/dormitory_details.json')),
    ontevekeny_korok: () => load<'ontevekeny_korok'>(import('./dictionaries/en/ontevekeny_korok.json')),
    competition_teams: () => load<'competition_teams'>(import('./dictionaries/en/competition_teams.json')),
    advanced_colleges: () => load<'advanced_colleges'>(import('./dictionaries/en/advanced_colleges.json')),
    clubs: () => load<'clubs'>(import('./dictionaries/en/clubs.json')),
    international_general: () => load<'international_general'>(import('./dictionaries/en/international_general.json')),
    international_education: () => load<'international_education'>(import('./dictionaries/en/international_education.json')),
    international_application: () => load<'international_application'>(import('./dictionaries/en/international_application.json')),
    international_dormitory: () => load<'international_dormitory'>(import('./dictionaries/en/international_dormitory.json')),
    international_mobility: () => load<'international_mobility'>(import('./dictionaries/en/international_mobility.json')),
    erasmus: () => load<'erasmus'>(import('./dictionaries/en/erasmus.json')),
    eelisa: () => load<'eelisa'>(import('./dictionaries/en/eelisa.json')),
    language_education: () => load<'language_education'>(import('./dictionaries/en/language_education.json')),
  },
}

export const getDictionary = async <K extends Namespace>(
  locale: Locale,
  namespace: K
): Promise<DictionaryMap[K]> => {
  return loaders[locale][namespace]();
}
