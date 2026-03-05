import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "completion" | "curriculum">;

export default function CompletionCurriculumSection({ completion, curriculum }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-2">
            {completion.title}
          </h3>
          <div className="prose max-w-none text-gray-700">
            {completion.paragraphs.map((p, i) => (
              <p key={i} className="mt-2">{p}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-2">
            {curriculum.title}
          </h3>
          <div className="prose max-w-none text-gray-700">
            {curriculum.paragraphs.map((p, i) => (
              <p key={i} className="mt-2">{p}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
