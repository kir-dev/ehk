import { ActionLink } from "@/components/common/ActionLink";
import { ContentBlocks } from "@/components/common/ContentBlocks";
import { SectionCard } from "@/components/common/SectionCard";
import type { Locale } from "@/i18n-config";

import { MOBILITY_LINKS } from "../mobility.constants";
import type { MobilitySection } from "../mobility.types";

interface MobilityContentProps {
  sections: MobilitySection[];
  locale: Locale;
}

/** Site-relative targets need the locale prefix, absolute URLs stay as they are. */
const resolveHref = (href: string, locale: Locale) =>
  href.startsWith("/") ? `/${locale}${href}` : href;

export function MobilityContent({
  sections,
  locale,
}: Readonly<MobilityContentProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      {sections.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          <div className="flex flex-col gap-2">
            <ContentBlocks blocks={section.blocks} />

            {section.actions?.map((action) => (
              <ActionLink
                className="w-fit"
                href={resolveHref(MOBILITY_LINKS[action.link], locale)}
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

export default MobilityContent;
