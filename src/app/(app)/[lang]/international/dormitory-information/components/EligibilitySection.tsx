import { Card, CardContent } from "@/components/ui/card";
import { DormitoryInformationData } from "./types";

type Props = Pick<DormitoryInformationData, "eligibility">;

export default function EligibilitySection({ eligibility }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-3">
          {eligibility.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{eligibility.description}</p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">{eligibility.dormitory_types_title}</h4>
        <div className="space-y-2">
          {eligibility.dormitory_types.map((dorm, i) => (
            <div key={i} className="flex gap-3 items-start bg-gray-50 p-3 rounded-md border border-gray-100">
              <span className="shrink-0 text-[#862633] font-bold text-lg leading-none mt-0.5">•</span>
              <div>
                <span className="font-semibold text-gray-900">{dorm.name}: </span>
                <span className="text-gray-700">{dorm.description}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
