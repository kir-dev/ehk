import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "semester_info">;

export default function SemesterInfoSection({ semester_info }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="prose max-w-none text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">{semester_info.absences.title}</h4>
              {semester_info.absences.paragraphs.map((p, i) => (
                <p key={i} className="mt-1">{p}</p>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900">{semester_info.how_it_works.title}</h4>
              <p className="mt-1">{semester_info.how_it_works.intro}</p>
              <div className="mt-3 space-y-4">
                {semester_info.how_it_works.stages.map((stage, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <h5 className="font-bold text-[#862633]">{stage.title}</h5>
                    <p className="mt-1">{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900">{semester_info.calendar.title}</h4>
              {semester_info.calendar.paragraphs.map((p, i) => (
                <p key={i} className="mt-1">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
