import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "late_registration">;

export default function LateRegistrationSection({ late_registration }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {late_registration.title}
          </h3>
          <div className="prose max-w-none text-gray-700 space-y-4">
            {late_registration.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed">{p}</p>
            ))}
            <ul className="list-disc pl-5 mt-1">
              {late_registration.requests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div>
              <h4 className="font-semibold text-gray-900">{late_registration.not_own_fault.title}</h4>
              <p className="mt-1">{late_registration.not_own_fault.intro}</p>
              <ul className="list-disc pl-5 mt-1">
                {late_registration.not_own_fault.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm italic">{late_registration.not_own_fault.outro}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
