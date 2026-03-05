import { Card, CardContent } from "@/components/ui/card";
import { EducationInformationData } from "./types";

type Props = Pick<EducationInformationData, "tdk">;

export default function TdkSection({ tdk }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {tdk.title}
          </h3>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>{tdk.intro}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900">{tdk.why.title}</h4>
                <ul className="list-disc pl-5 mt-1">
                  {tdk.why.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">{tdk.who.title}</h4>
                <ul className="list-disc pl-5 mt-1">
                  {tdk.who.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-gray-900 mt-4">{tdk.how.title}</h4>
                <ul className="list-disc pl-5 mt-1">
                  {tdk.how.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h4 className="font-semibold text-[#862633]">{tdk.timeline.title}</h4>
              <ul className="list-none space-y-2 mt-2">
                {tdk.timeline.items.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-[#862633] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm italic border-t border-gray-200 pt-2">{tdk.timeline.extra}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
