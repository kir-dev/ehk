import { DormitoryInformationData } from "./types";
import EligibilitySection from "./EligibilitySection";
import FrequencyAdmissionSection from "./FrequencyAdmissionSection";
import ApplicationStepsSection from "./ApplicationStepsSection";

export default function DormitoryInformationContent({ content }: { content: DormitoryInformationData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      <EligibilitySection eligibility={content.eligibility} />
      <FrequencyAdmissionSection frequency={content.frequency} admission={content.admission} />
      <ApplicationStepsSection application_steps={content.application_steps} />
    </div>
  );
}
