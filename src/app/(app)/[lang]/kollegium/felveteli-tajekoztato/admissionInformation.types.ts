export type FacultyCode =
  | "ÉMK"
  | "GPK"
  | "ÉPK"
  | "VBK"
  | "VIK"
  | "GTK"
  | "TTK"
  | "KJK";

export type FacultyDictionary = Record<FacultyCode, string>;

export interface AdmissionInformation {
  title: string;
  capacity_p2: string;
  application: string;
  application_p1: string;
  application_p2: string;
  application_p3: string;
  introduction_p1: string;
  introduction_link: string;
  introduction_p2: string;
  important_links: string;
  kefir_description: string;
  faculty_unions: string;
}
