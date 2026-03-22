import { EducationInformationData } from "./types";
import SubjectDescriptionSection from "./SubjectDescriptionSection";
import RegistrationPeriodsSection from "./RegistrationPeriodsSection";
import LateRegistrationSection from "./LateRegistrationSection";
import CodeOfStudiesSection from "./CodeOfStudiesSection";
import EvaluationSection from "./EvaluationSection";
import OhvSection from "./OhvSection";
import SemesterInfoSection from "./SemesterInfoSection";
import TdkSection from "./TdkSection";
import { SectionHeader } from "@/components/common/SectionHeader";

export default function EducationInformationContent({ content }: { content: EducationInformationData }) {
  return (
    <div className="flex flex-col gap-16 lg:px-4 px-2">
      <section id="subject-description" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.subject_description} />
        <SubjectDescriptionSection subject_description={content.subject_description} />
      </section>

      <section id="registration-periods" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.registration_periods} />
        <div className="flex flex-col gap-4 md:gap-6">
          <RegistrationPeriodsSection registration_periods={content.registration_periods} />
          <LateRegistrationSection late_registration={content.late_registration} />
        </div>
      </section>

      <section id="code-of-studies" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.code_of_studies} />
        <CodeOfStudiesSection 
          code_of_studies={content.code_of_studies}
          completion={content.completion}
          curriculum={content.curriculum}
        />
      </section>

      <section id="evaluation" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.evaluation} />
        <EvaluationSection evaluation={content.evaluation} />
        <OhvSection evaluation={content.evaluation} />
      </section>

      <section id="semester-info" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.semester_info} />
        <SemesterInfoSection semester_info={content.semester_info} />
      </section>

      <section id="tdk" className="scroll-mt-28 space-y-8">
        <SectionHeader title={content.nav.tdk} />
        <TdkSection tdk={content.tdk} />
      </section>
    </div>
  );
}
