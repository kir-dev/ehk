import { Card, CardContent } from "@/components/ui/card";
import { ApplicationInformationData } from "./types";

type Props = Pick<ApplicationInformationData, "faculty_scholarships">;

export default function FacultyScholarshipsSection({ faculty_scholarships }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-4">
          {faculty_scholarships.title}
        </h3>
        <div className="space-y-4">
          {faculty_scholarships.items.map((item, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h4 className="font-semibold text-[#862633]">{item.title}</h4>
              <p className="mt-2 text-gray-700 leading-relaxed">{item.description}</p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                Relevant faculties: <span className="text-gray-700">{item.faculties}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600 italic border-t pt-4">{faculty_scholarships.note}</p>
      </CardContent>
    </Card>
  );
}
