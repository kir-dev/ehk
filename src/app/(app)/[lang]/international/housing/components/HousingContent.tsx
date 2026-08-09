import { Accordion, type AccordionEntry } from "@/components/common/Accordion";
import { ContentBlocks } from "@/components/common/ContentBlocks";

import type { HousingFaqEntry } from "../housing.types";

interface HousingContentProps {
  faq: HousingFaqEntry[];
}

export function HousingContent({ faq }: Readonly<HousingContentProps>) {
  const entries: AccordionEntry[] = faq.map((item) => ({
    id: item.id,
    header: item.question,
    headingLevel: 2,
    content: <ContentBlocks blocks={item.blocks} />,
  }));

  return (
    <div className="rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      <Accordion items={entries} />
    </div>
  );
}

export default HousingContent;
