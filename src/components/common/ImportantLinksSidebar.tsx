import { Button } from "@/components/ui/button";
import type { SocialScholarshipsFaq } from "@/payload-types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export type SidebarLink = NonNullable<
  SocialScholarshipsFaq["sidebarLinks"]
>[number];

/**
 * "Fontos linkek" sidebar shared by the scholarship pages. The links are
 * maintained in the Social scholarships FAQ global, so every page that renders
 * this sidebar shows the same set.
 */
export function ImportantLinksSidebar({
  links,
  isEn,
  title,
}: Readonly<{
  links: SidebarLink[];
  isEn: boolean;
  title: string;
}>) {
  return (
    <aside className="rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 shadow-sm lg:sticky lg:top-24">
      <h2 className="font-open-sans text-[13px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#6e6660]">
        {title}
      </h2>
      <div className="mt-3 space-y-4">
        {links.map((link, index) => {
          const label = isEn
            ? link.title_en || link.title_hu
            : link.title_hu || link.title_en;
          const description = isEn
            ? link.description_en || link.description_hu
            : link.description_hu || link.description_en;

          return (
            <div key={link.id ?? `${label}-${index}`} className="space-y-2">
              {description && (
                <p className="font-open-sans text-sm leading-snug text-[#2f2a27]">
                  {description}
                </p>
              )}
              <Button
                asChild
                className="h-auto min-h-9 whitespace-normal rounded-full bg-[#862633] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#9e2d3e]"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <span>{label}</span>
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default ImportantLinksSidebar;
