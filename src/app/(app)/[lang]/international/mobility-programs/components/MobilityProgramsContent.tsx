import { MobilityProgramsData } from "./types";
import ProgramCard from "./ProgramCard";

export default function MobilityProgramsContent({ content }: { content: MobilityProgramsData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      <p className="text-gray-700 leading-relaxed">{content.intro}</p>

      {content.programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
