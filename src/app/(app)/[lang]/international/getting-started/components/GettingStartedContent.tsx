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
        <section
          className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] p-4"
          key={section.title}
        >
          <h2 className="font-playfair text-base font-semibold uppercase leading-[1.4] text-black">
            {section.title}
          </h2>

          <div className="h-px w-full bg-[#e9e2d6]" />

          <div className="flex flex-col gap-8">
            {section.groups.map((group) => (
              <InfoGroup group={group} key={group.label} locale={locale} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default GettingStartedContent;
