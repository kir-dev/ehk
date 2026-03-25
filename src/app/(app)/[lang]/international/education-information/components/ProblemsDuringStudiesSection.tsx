import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "code_of_studies">;

export default function ProblemsDuringStudiesSection({ code_of_studies }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h4 className="font-semibold text-gray-900 text-lg mb-4 group-hover:text-[#862633] transition-colors">
          {code_of_studies.problems.title}
        </h4>
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-gray-800">{code_of_studies.problems.professor.title}</h5>
            <ul className="list-disc pl-5 mt-1">
              {code_of_studies.problems.professor.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800">{code_of_studies.problems.students_council.title}</h5>
            <ul className="list-disc pl-5 mt-1">
              {code_of_studies.problems.students_council.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
