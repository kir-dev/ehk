import { EducationInformationData } from "./types";
import SubjectDescriptionSection from "./SubjectDescriptionSection";
import RegistrationPeriodsSection from "./RegistrationPeriodsSection";
import LateRegistrationSection from "./LateRegistrationSection";
import CodeOfStudiesSection from "./CodeOfStudiesSection";
import EvaluationSection from "./EvaluationSection";
import SemesterInfoSection from "./SemesterInfoSection";
import CompletionCurriculumSection from "./CompletionCurriculumSection";
import TdkSection from "./TdkSection";

export default function EducationInformationContent({ content }: { content: EducationInformationData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      <SubjectDescriptionSection subject_description={content.subject_description} />
      <RegistrationPeriodsSection registration_periods={content.registration_periods} />
      <LateRegistrationSection late_registration={content.late_registration} />
      <CodeOfStudiesSection code_of_studies={content.code_of_studies} />
      <EvaluationSection evaluation={content.evaluation} />
      <SemesterInfoSection semester_info={content.semester_info} />
      <CompletionCurriculumSection completion={content.completion} curriculum={content.curriculum} />
      <TdkSection tdk={content.tdk} />
    </div>
  );
}
