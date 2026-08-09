import { ActionLink } from "@/components/common/ActionLink";
import { ContentBlocks } from "@/components/common/ContentBlocks";
import { SectionCard } from "@/components/common/SectionCard";

import { SCHOLARSHIPS_LINKS } from "../scholarships.constants";
import type { ScholarshipsSection } from "../scholarships.types";

interface ScholarshipsContentProps {
  sections: ScholarshipsSection[];
}

export function ScholarshipsContent({
  sections,
}: Readonly<ScholarshipsContentProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      {sections.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          <div className="flex flex-col gap-2">
            <ContentBlocks blocks={section.blocks} />

            {section.actions?.map((action) => (
              <ActionLink
                className="w-fit"
                href={SCHOLARSHIPS_LINKS[action.link]}
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

export default ScholarshipsContent;
