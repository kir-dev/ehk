import {
  ActionLink,
  type ActionLinkVariant,
} from "@/components/common/ActionLink";

export interface SidebarActionLink {
  label: string;
  href: string;
  variant?: ActionLinkVariant;
}

export interface SidebarGroup {
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
  groups,
}: Readonly<{ groups: SidebarGroup[] }>) {
  return (
    <aside className="mt-4 flex h-fit flex-col gap-6 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 xl:sticky xl:top-8 xl:mt-8 xl:rounded-l-none xl:border-l-0">
      {groups.map((group) => (
        <div
          className="flex flex-col gap-4"
          key={group.title ?? group.links[0]?.href}
        >
          {group.title && (
            <h2 className="py-1 font-open-sans text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-[#6e6660]">
              {group.title}
            </h2>
          )}

          {group.description && (
            <p className="font-open-sans text-sm leading-[1.6] text-black">
              {group.description}
            </p>
          )}

          <div className="flex flex-col items-start gap-2">
            {group.links.map((link) => (
              <ActionLink
                className="max-w-full"
                href={link.href}
                key={link.href}
                label={link.label}
                variant={link.variant}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

export default LinksSidebar;
