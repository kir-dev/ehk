import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { EelisaSection } from "./EelisaSection";
import type { PartnerUniversity } from "./eelisa.types";

interface EelisaPartnersProps {
  title: string;
  partners: PartnerUniversity[];
}

export function EelisaPartners({
  title,
  partners,
}: Readonly<EelisaPartnersProps>) {
  return (
    <EelisaSection title={title}>
      <ul className="flex flex-col gap-4">
        {partners.map((partner, index) => (
          <li key={partner.id ?? `${partner.name}-${index}`}>
            <Link
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[52px] items-center gap-1 rounded-lg border border-[#e9e2d6] bg-[#f9f4f0] p-4 transition-colors hover:border-[#862633] hover:bg-[#fffefc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#862633] lg:h-[52px]"
            >
              <span className="min-w-0 flex-1 font-open-sans text-sm leading-[1.6] text-[#1a1a1a] lg:whitespace-nowrap">
                {partner.name}
              </span>
              <ExternalLink
                aria-hidden="true"
                className="size-5 shrink-0 text-[#1a1a1a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#862633]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </EelisaSection>
  );
}
