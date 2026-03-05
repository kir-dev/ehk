import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "code_of_studies">;

export default function CodeOfStudiesSection({ code_of_studies }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {code_of_studies.title}
          </h3>
          <div className="prose max-w-none text-gray-700 space-y-4 mt-2">
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

            <div>
              <h4 className="font-semibold text-gray-900 text-lg border-t pt-4">
                {code_of_studies.problems.title}
              </h4>
              <div className="mt-2 space-y-3">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
