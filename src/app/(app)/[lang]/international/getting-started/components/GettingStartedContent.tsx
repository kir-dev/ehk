import { SectionCard } from "@/components/common/SectionCard";
import type { Locale } from "@/i18n-config";

import type { GettingStartedSection } from "../gettingStarted.types";
import { InfoGroup } from "./InfoGroup";

interface GettingStartedContentProps {
  sections: GettingStartedSection[];
  locale: Locale;
}

export function GettingStartedContent({
  sections,
  locale,
}: Readonly<GettingStartedContentProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      {sections.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          <div className="flex flex-col gap-8">
            {section.groups.map((group) => (
              <InfoGroup group={group} key={group.label} locale={locale} />
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

export default GettingStartedContent;
