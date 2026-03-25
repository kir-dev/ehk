export interface FacultyCouncil {
  faculty: string;
  website: string;
  email: string;
}

export interface ScholarshipItem {
  title: string;
  description: string;
}

export interface FacultyScholarshipItem extends ScholarshipItem {
  faculties: string;
}

export interface NeptunRequest {
  code: string;
  title: string;
  description: string;
}

export interface ApplicationInformationData {
  title: string;
  intro: string;
  university_scholarships: {
    title: string;
    items: ScholarshipItem[];
  };
  faculty_scholarships: {
    title: string;
    items: FacultyScholarshipItem[];
    note: string;
  };
  submission: {
    title: string;
    description: string;
  };
  contacts: {
    title: string;
    students_union: {
      title: string;
      website: string;
      email: string;
    };
    faculty_councils_title: string;
    faculty_councils: FacultyCouncil[];
  };
  neptun_requests: {
    title: string;
    note: string;
    items: NeptunRequest[];
  };
}
