export interface DormitoryType {
  name: string;
  description: string;
}

export interface RankingGroup {
  group: string;
  detail: string;
}

export interface ApplicationGroup {
  title: string;
  intro: string;
  steps: string[];
}

export interface DormitoryInformationData {
  title: string;
  eligibility: {
    title: string;
    description: string;
    dormitory_types_title: string;
    dormitory_types: DormitoryType[];
  };
  frequency: {
    title: string;
    description: string;
  };
  admission: {
    title: string;
    description: string;
    ranking: RankingGroup[];
  };
  application_steps: {
    title: string;
    kefir_link: string;
    groups: ApplicationGroup[];
  };
}
