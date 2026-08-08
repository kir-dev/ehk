import { ContentBlocks } from "@/components/common/ContentBlocks";
import { ExternalActionLink } from "@/components/common/ExternalActionLink";
import { SectionCard } from "@/components/common/SectionCard";

import { EDUCATION_LINKS } from "../education.constants";
import type { EducationSection } from "../education.types";

interface EducationContentProps {
  sections: EducationSection[];
}

export function EducationContent({
  sections,
}: Readonly<EducationContentProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      {sections.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          <div className="flex flex-col gap-2">
            <ContentBlocks blocks={section.blocks} />

            {section.actions?.map((action) => (
              <ExternalActionLink
                className="w-fit"
                href={EDUCATION_LINKS[action.link]}
                key={action.link}
                label={action.label}
              />
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

export default EducationContent;
