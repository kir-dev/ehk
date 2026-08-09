import { ExternalActionLink } from "@/components/common/ExternalActionLink";

export interface SidebarActionLink {
  label: string;
  href: string;
}

interface LinksSidebarProps {
  /** Small uppercase heading, e.g. "Important links". */
  title?: string;
  /** Introductory sentence shown above the buttons. */
  description?: string;
  links: SidebarActionLink[];
}

/**
 * Sidebar of the international information pages: sits flush against the main
 * panel from `xl` up and follows the reader while they scroll.
 */
export function LinksSidebar({
  title,
  description,
  links,
}: Readonly<LinksSidebarProps>) {
  return (
    <aside className="mt-4 flex h-fit flex-col gap-4 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 xl:sticky xl:top-8 xl:mt-8 xl:rounded-l-none xl:border-l-0">
      {title && (
        <h2 className="py-1 font-open-sans text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-[#6e6660]">
          {title}
        </h2>
      )}

      {description && (
        <p className="font-open-sans text-sm leading-[1.6] text-black">
          {description}
        </p>
      )}

      <div className="flex flex-col items-start gap-2">
        {links.map((link) => (
          <ExternalActionLink
            className="max-w-full"
            href={link.href}
            key={link.href}
            label={link.label}
          />
        ))}
      </div>
    </aside>
  );
}

export default LinksSidebar;
