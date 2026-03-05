import { Card, CardContent } from "@/components/ui/card";
import { ApplicationInformationData } from "./types";

type Props = Pick<ApplicationInformationData, "university_scholarships">;

export default function UniversityScholarshipsSection({ university_scholarships }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-4">
          {university_scholarships.title}
        </h3>
        <div className="space-y-4">
          {university_scholarships.items.map((item, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h4 className="font-semibold text-[#862633]">{item.title}</h4>
              <p className="mt-2 text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
