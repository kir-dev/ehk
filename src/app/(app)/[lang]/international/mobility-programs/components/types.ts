export type ProgramType = "long-term" | "short-term" | "internship";

export interface ProgramSubsection {
  title: string;
  description: string;
}

export interface MobilityProgram {
  id: string;
  title: string;
  type: ProgramType;
  description: string;
  destinations_title?: string;
  destinations?: string[];
  extra?: string;
  subsections?: ProgramSubsection[];
  more_info_label?: string;
  more_info_link?: string;
}

export interface MobilityProgramsData {
  title: string;
  intro: string;
  programs: MobilityProgram[];
}
