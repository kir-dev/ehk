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

const loaders: Record<Locale, { [K in Namespace]: () => Promise<unknown> }> = {
  hu: {
    common: () => import('./dictionaries/hu/common.json').then((m) => m.default),
    scholarships: () => import('./dictionaries/hu/scholarships.json').then((m) => m.default),
    regulations: () => import('./dictionaries/hu/regulations.json').then((m) => m.default),
    news: () => import('./dictionaries/hu/news.json').then((m) => m.default),
    representatives: () => import('./dictionaries/hu/representatives.json').then((m) => m.default),
    permissions: () => import('./dictionaries/hu/permissions.json').then((m) => m.default),
    sport: () => import('./dictionaries/hu/sport.json').then((m) => m.default),
    knowledge_base: () => import('./dictionaries/hu/knowledge_base.json').then((m) => m.default),
    dormitories: () => import('./dictionaries/hu/dormitories.json').then((m) => m.default),
    dormitory_details: () => import('./dictionaries/hu/dormitory_details.json').then((m) => m.default),
    ontevekeny_korok: () => import('./dictionaries/hu/ontevekeny_korok.json').then((m) => m.default),
    competition_teams: () => import('./dictionaries/hu/competition_teams.json').then((m) => m.default),
    advanced_colleges: () => import('./dictionaries/hu/advanced_colleges.json').then((m) => m.default),
    clubs: () => import('./dictionaries/hu/clubs.json').then((m) => m.default),
    international_general: () => import('./dictionaries/hu/international_general.json').then((m) => m.default),
    international_education: () => import('./dictionaries/hu/international_education.json').then((m) => m.default),
    international_application: () => import('./dictionaries/hu/international_application.json').then((m) => m.default),
    international_dormitory: () => import('./dictionaries/hu/international_dormitory.json').then((m) => m.default),
    international_mobility: () => import('./dictionaries/hu/international_mobility.json').then((m) => m.default),
    erasmus: () => import('./dictionaries/hu/erasmus.json').then((m) => m.default),
    eelisa: () => import('./dictionaries/hu/eelisa.json').then((m) => m.default),
    language_education: () => import('./dictionaries/hu/language_education.json').then((m) => m.default),
  },
  en: {
    common: () => import('./dictionaries/en/common.json').then((m) => m.default),
    scholarships: () => import('./dictionaries/en/scholarships.json').then((m) => m.default),
    regulations: () => import('./dictionaries/en/regulations.json').then((m) => m.default),
    news: () => import('./dictionaries/en/news.json').then((m) => m.default),
    representatives: () => import('./dictionaries/en/representatives.json').then((m) => m.default),
    permissions: () => import('./dictionaries/en/permissions.json').then((m) => m.default),
    sport: () => import('./dictionaries/en/sport.json').then((m) => m.default),
    knowledge_base: () => import('./dictionaries/en/knowledge_base.json').then((m) => m.default),
    dormitories: () => import('./dictionaries/en/dormitories.json').then((m) => m.default),
    dormitory_details: () => import('./dictionaries/en/dormitory_details.json').then((m) => m.default),
    ontevekeny_korok: () => import('./dictionaries/en/ontevekeny_korok.json').then((m) => m.default),
    competition_teams: () => import('./dictionaries/en/competition_teams.json').then((m) => m.default),
    advanced_colleges: () => import('./dictionaries/en/advanced_colleges.json').then((m) => m.default),
    clubs: () => import('./dictionaries/en/clubs.json').then((m) => m.default),
    international_general: () => import('./dictionaries/en/international_general.json').then((m) => m.default),
    international_education: () => import('./dictionaries/en/international_education.json').then((m) => m.default),
    international_application: () => import('./dictionaries/en/international_application.json').then((m) => m.default),
    international_dormitory: () => import('./dictionaries/en/international_dormitory.json').then((m) => m.default),
    international_mobility: () => import('./dictionaries/en/international_mobility.json').then((m) => m.default),
    erasmus: () => import('./dictionaries/en/erasmus.json').then((m) => m.default),
    eelisa: () => import('./dictionaries/en/eelisa.json').then((m) => m.default),
    language_education: () => import('./dictionaries/en/language_education.json').then((m) => m.default),
  },
}

export const getDictionary = async <K extends Namespace>(
  locale: Locale,
  namespace: K
): Promise<DictionaryMap[K]> => {
  return loaders[locale][namespace]() as Promise<DictionaryMap[K]>;
}
