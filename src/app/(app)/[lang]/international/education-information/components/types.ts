export interface EducationInformationData {
  nav: {
    main_sections: string;
    subject_description: string;
    registration_periods: string;
    code_of_studies: string;
    evaluation: string;
    semester_info: string;
    tdk: string;
  };
  title: string;
  subject_description: {
    title: string;
    where_available: { title: string; description: string };
    languages: { title: string; description: string; items: string[] };
    approval: { title: string; items: string[] };
    must_include: { title: string; items: string[] };
  };
  registration_periods: {
    title: string;
    paragraphs: string[];
  };
  late_registration: {
    title: string;
    paragraphs: string[];
    requests: string[];
    not_own_fault: { title: string; intro: string; items: string[]; outro: string };
  };
  code_of_studies: {
    title: string;
    study_levels: { title: string; items: string[]; extra: string };
    languages: { title: string; items: string[] };
    formats: { title: string; items: string[] };
    subjects: { title: string; items: string[] };
    problems: {
      title: string;
      professor: { title: string; items: string[] };
      students_council: { title: string; items: string[] };
    };
  };
  evaluation: {
    title: string;
    assessment_goals: { title: string; intro: string; items: string[] };
    assessment_types: {
      title: string;
      diagnostic: { title: string; items: string[] };
      formative: { title: string; items: string[] };
      summative: { title: string; items: string[] };
    };
    ohv: {
      title: string;
      intro: string;
      why_matters: { title: string; items: string[]; extra: string };
    };
  };
  semester_info: {
    title: string;
    absences: { title: string; paragraphs: string[] };
    how_it_works: {
      title: string;
      intro: string;
      stages: { title: string; description: string }[];
    };
    calendar: { title: string; paragraphs: string[] };
  };
  completion: { title: string; paragraphs: string[] };
  curriculum: { title: string; paragraphs: string[] };
  tdk: {
    title: string;
    intro: string;
    why: { title: string; items: string[] };
    who: { title: string; items: string[] };
    how: { title: string; items: string[] };
    timeline: { title: string; items: string[]; extra: string };
  };
}
