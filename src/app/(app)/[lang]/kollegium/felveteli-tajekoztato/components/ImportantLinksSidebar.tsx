import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { FACULTY_LINKS } from "../admissionInformation.constants";
import type {
  AdmissionInformation,
  FacultyDictionary,
} from "../admissionInformation.types";

interface ImportantLinksSidebarProps {
  content: AdmissionInformation;
  faculties: FacultyDictionary;
}

const actionLinkClassName =
  "group flex items-center gap-2 rounded-2xl border border-ehk-dark-red bg-ehk-dark-red px-4 py-2 font-open-sans text-xs leading-[1.5] text-white transition-colors hover:border-ehk-light-red hover:bg-ehk-light-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red";

function ExternalActionLink({
  children,
  className = "",
  href,
}: Readonly<{
  children: ReactNode;
  className?: string;
  href: string;
}>) {
  return (
    <a
      className={`${actionLinkClassName} ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="min-w-0 flex-1">{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function ImportantLinksSidebar({
  content,
  faculties,
}: Readonly<ImportantLinksSidebarProps>) {
  return (
    <aside className="mt-4 h-fit rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 xl:mt-8 xl:rounded-l-none xl:border-l-0">
      <div className="flex flex-col gap-4">
        <h2 className="py-1 font-open-sans text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-[#6e6660]">
          {content.important_links}
        </h2>

        <section className="flex flex-col items-start gap-2">
          <h3 className="font-open-sans text-[13px] font-semibold leading-normal text-black">
            {content.kefir_description}
          </h3>
          <ExternalActionLink className="w-fit" href="https://kefir.bme.hu/">
            KEFIR
          </ExternalActionLink>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-open-sans text-[13px] font-semibold leading-normal text-black">
            {content.faculty_unions}
          </h3>
          {FACULTY_LINKS.map(({ code, href }) => (
            <ExternalActionLink href={href} key={code}>
              <span className="uppercase">{faculties[code]}</span>
            </ExternalActionLink>
          ))}
        </section>
      </div>
    </aside>
  );
}
