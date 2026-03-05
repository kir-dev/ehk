import { Card, CardContent } from "@/components/ui/card";
import { MobilityProgram, ProgramType } from "./types";

const TYPE_LABELS: Record<ProgramType, string> = {
  "long-term": "Long-term",
  "short-term": "Short-term",
  "internship": "Internship",
};

const TYPE_COLORS: Record<ProgramType, string> = {
  "long-term": "bg-blue-100 text-blue-800",
  "short-term": "bg-green-100 text-green-800",
  "internship": "bg-orange-100 text-orange-800",
};

interface Props {
  program: MobilityProgram;
}

export default function ProgramCard({ program }: Props) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
            {program.title}
          </h3>
          <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[program.type]}`}>
            {TYPE_LABELS[program.type]}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">{program.description}</p>

        {/* Destinations list (Erasmus+) */}
        {program.destinations && (
          <div className="mt-3">
            <p className="font-medium text-gray-900 text-sm mb-2">{program.destinations_title}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {program.destinations.map((dest, i) => (
                <li key={i} className="flex gap-1.5 items-start text-sm text-gray-700">
                  <span className="text-[#862633] shrink-0 mt-0.5">•</span>
                  {dest}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Extra text */}
        {program.extra && (
          <p className="mt-3 text-gray-700 leading-relaxed text-sm">{program.extra}</p>
        )}

        {/* Subsections (CEEPUS bilateral/semester abroad) */}
        {program.subsections && (
          <div className="mt-4 space-y-3 border-t pt-3">
            {program.subsections.map((sub, i) => (
              <div key={i}>
                <h4 className="font-semibold text-gray-900 text-sm">{sub.title}</h4>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{sub.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* More info link */}
        {program.more_info_link && (
          <p className="mt-4 text-sm border-t pt-3 text-gray-600">
            {program.more_info_label}:{" "}
            <a
              href={program.more_info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#862633] hover:underline font-medium break-all"
            >
              {program.more_info_link}
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
