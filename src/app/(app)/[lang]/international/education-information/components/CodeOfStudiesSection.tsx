import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";
import CompletionCurriculumSection from "./CompletionCurriculumSection";
import ProblemsDuringStudiesSection from "./ProblemsDuringStudiesSection";

type Props = Pick<EducationInformationData, "code_of_studies" | "completion" | "curriculum">;

export default function CodeOfStudiesSection({ code_of_studies, completion, curriculum }: Props) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <div className="prose max-w-none text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">{code_of_studies.study_levels.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {code_of_studies.study_levels.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-1">{code_of_studies.study_levels.extra}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{code_of_studies.languages.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {code_of_studies.languages.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{code_of_studies.formats.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {code_of_studies.formats.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{code_of_studies.subjects.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {code_of_studies.subjects.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ProblemsDuringStudiesSection code_of_studies={code_of_studies} />
      <CompletionCurriculumSection completion={completion} curriculum={curriculum} />
    </div>
  );
}
