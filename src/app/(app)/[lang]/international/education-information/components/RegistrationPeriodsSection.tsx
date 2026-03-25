import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "registration_periods">;

export default function RegistrationPeriodsSection({ registration_periods }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {registration_periods.title}
          </h3>
          <div className="prose max-w-none text-gray-700 space-y-2">
            {registration_periods.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
