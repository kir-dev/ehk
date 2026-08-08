import { ExternalActionLink } from "@/components/common/ExternalActionLink";

import { EDUCATION_LINKS } from "../education.constants";
import type { Education } from "../education.types";

export function RegulationsSidebar({
  sidebar,
}: Readonly<{ sidebar: Education["sidebar"] }>) {
  return (
    <aside className="mt-4 flex h-fit flex-col gap-4 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 xl:sticky xl:top-8 xl:mt-8 xl:rounded-l-none xl:border-l-0">
      <p className="font-open-sans text-sm leading-[1.6] text-black">
        {sidebar.text}
      </p>

      <ExternalActionLink
        className="w-fit"
        href={EDUCATION_LINKS[sidebar.action.link]}
        label={sidebar.action.label}
      />
    </aside>
  );
}

export default RegulationsSidebar;
