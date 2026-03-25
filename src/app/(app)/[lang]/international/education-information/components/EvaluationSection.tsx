import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "evaluation">;

export default function EvaluationSection({ evaluation }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="prose max-w-none text-gray-700 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">{evaluation.assessment_goals.title}</h4>
            <p className="mt-1">{evaluation.assessment_goals.intro}</p>
            <ul className="list-disc pl-5 mt-1">
              {evaluation.assessment_goals.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-lg">{evaluation.assessment_types.title}</h4>

            <h5 className="font-medium mt-2">{evaluation.assessment_types.diagnostic.title}</h5>
            <ul className="list-disc pl-5 mt-1">
              {evaluation.assessment_types.diagnostic.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h5 className="font-medium mt-3">{evaluation.assessment_types.formative.title}</h5>
            <ul className="list-disc pl-5 mt-1">
              {evaluation.assessment_types.formative.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h5 className="font-medium mt-3">{evaluation.assessment_types.summative.title}</h5>
            <ul className="list-disc pl-5 mt-1">
              {evaluation.assessment_types.summative.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
