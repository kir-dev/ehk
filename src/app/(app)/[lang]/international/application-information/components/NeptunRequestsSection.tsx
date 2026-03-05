import { Card, CardContent } from "@/components/ui/card";
import { ApplicationInformationData } from "./types";

type Props = Pick<ApplicationInformationData, "neptun_requests">;

export default function NeptunRequestsSection({ neptun_requests }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-1">
          {neptun_requests.title}
        </h3>
        <p className="text-sm text-gray-500 italic mb-4">{neptun_requests.note}</p>

        <div className="space-y-3">
          {neptun_requests.items.map((req, i) => (
            <div key={i} className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="shrink-0 inline-block bg-[#862633] text-white text-xs font-bold px-2 py-1 rounded min-w-[4rem] text-center">
                {req.code}
              </span>
              <div>
                <p className="font-semibold text-gray-900 leading-snug">{req.title}</p>
                {req.description && (
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{req.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
