import { Card, CardContent } from "@/components/ui/card";
import { DormitoryInformationData } from "./types";

type Props = Pick<DormitoryInformationData, "frequency" | "admission">;

export default function FrequencyAdmissionSection({ frequency, admission }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Frequency */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-3">
            {frequency.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{frequency.description}</p>
        </CardContent>
      </Card>

      {/* Admission */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-3">
            {admission.title}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">{admission.description}</p>
          <div className="space-y-3">
            {admission.ranking.map((r, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                <span className="font-semibold text-[#862633]">{r.group}: </span>
                <span className="text-gray-700">{r.detail}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
