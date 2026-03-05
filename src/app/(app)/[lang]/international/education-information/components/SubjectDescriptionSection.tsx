import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "subject_description">;

export default function SubjectDescriptionSection({ subject_description }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {subject_description.title}
          </h3>

          <div className="prose max-w-none text-gray-700 mt-2 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">{subject_description.where_available.title}</h4>
              <p>{subject_description.where_available.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{subject_description.languages.title}</h4>
              <p>{subject_description.languages.description}</p>
              <ul className="list-disc pl-5 mt-1">
                {subject_description.languages.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{subject_description.approval.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {subject_description.approval.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{subject_description.must_include.title}</h4>
              <ul className="list-disc pl-5 mt-1">
                {subject_description.must_include.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
