import { ApplicationInformationData } from "./types";
import UniversityScholarshipsSection from "./UniversityScholarshipsSection";
import FacultyScholarshipsSection from "./FacultyScholarshipsSection";
import SubmissionContactsSection from "./SubmissionContactsSection";
import NeptunRequestsSection from "./NeptunRequestsSection";

export default function ApplicationInformationContent({ content }: { content: ApplicationInformationData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      {/* Intro */}
      <p className="text-gray-700 leading-relaxed">{content.intro}</p>

      <UniversityScholarshipsSection university_scholarships={content.university_scholarships} />
      <FacultyScholarshipsSection faculty_scholarships={content.faculty_scholarships} />
      <SubmissionContactsSection submission={content.submission} contacts={content.contacts} />
      <NeptunRequestsSection neptun_requests={content.neptun_requests} />
    </div>
  );
}
