import { ExternalActionLink } from "@/components/common/ExternalActionLink";

import { GETTING_STARTED_LINKS } from "../gettingStarted.constants";
import type { GettingStartedAction } from "../gettingStarted.types";

interface ImportantLinksSidebarProps {
  title: string;
  links: GettingStartedAction[];
}

export function ImportantLinksSidebar({
  title,
  links,
}: Readonly<ImportantLinksSidebarProps>) {
  return (
    <aside className="mt-4 h-fit rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 xl:sticky xl:top-8 xl:mt-8 xl:rounded-l-none xl:border-l-0">
      <div className="flex flex-col gap-4">
        <h2 className="py-1 font-open-sans text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-[#6e6660]">
          {title}
        </h2>

        <div className="flex flex-col items-start gap-2">
          {links.map((link) => (
            <ExternalActionLink
              className="max-w-full"
              href={GETTING_STARTED_LINKS[link.link]}
              key={link.link}
              label={link.label}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ImportantLinksSidebar;
