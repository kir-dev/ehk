import { Card, CardContent } from "@/components/ui/card";
import { DormitoryInformationData } from "./types";

type Props = Pick<DormitoryInformationData, "application_steps">;

const URL_SPLIT_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_TEST_REGEX = /^https?:\/\//;

function StepText({ text }: { text: string }) {
  const parts = text.split(URL_SPLIT_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        URL_TEST_REGEX.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#862633] hover:underline font-medium break-all"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ApplicationStepsSection({ application_steps }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-4">
          {application_steps.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {application_steps.groups.map((group, gi) => (
            <div key={gi}>
              <h4 className="font-semibold text-gray-900 mb-1">{group.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{group.intro}</p>
              <ol className="space-y-3">
                {group.steps.map((step, si) => (
                  <li key={si} className="flex gap-3 items-start">
                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#862633] text-white text-xs font-bold mt-0.5">
                      {si + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <StepText text={step} />
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
