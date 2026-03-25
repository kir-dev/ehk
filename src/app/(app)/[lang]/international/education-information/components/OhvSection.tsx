import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "evaluation">;

export default function OhvSection({ evaluation }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="prose max-w-none text-gray-700">
          <h4 className="font-semibold text-gray-900 group-hover:text-[#862633] transition-colors">{evaluation.ohv.title}</h4>
          <p className="mt-1">{evaluation.ohv.intro}</p>
          <h5 className="font-medium mt-2">{evaluation.ohv.why_matters.title}</h5>
          <ul className="list-disc pl-5 mt-1">
            {evaluation.ohv.why_matters.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm italic">{evaluation.ohv.why_matters.extra}</p>
        </div>
      </CardContent>
    </Card>
  );
}
