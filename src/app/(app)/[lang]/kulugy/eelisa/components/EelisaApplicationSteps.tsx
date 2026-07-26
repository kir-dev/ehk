import { CheckCircle, Search, Send } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { EelisaActionLink } from "./EelisaActionLink";
import { EelisaSection } from "./EelisaSection";
import type { ApplicationStep } from "./eelisa.types";

interface EelisaApplicationStepsProps {
  title: string;
  steps: ApplicationStep[];
}

const stepIcons: ReactNode[] = [
  <Search aria-hidden="true" className="size-4" key="search" />,
  <Send aria-hidden="true" className="size-4" key="send" />,
  <CheckCircle aria-hidden="true" className="size-4" key="check" />,
  <Image
    alt=""
    aria-hidden="true"
    height={24}
    key="plane"
    src="/eelisa/plane.png"
    width={24}
    className="size-6"
  />,
];

export function EelisaApplicationSteps({
  title,
  steps,
}: Readonly<EelisaApplicationStepsProps>) {
  return (
    <EelisaSection title={title}>
      <ol>
        {steps.map((step, index) => (
          <li
            className="grid grid-cols-[35px_minmax(0,1fr)] items-start gap-4"
            key={`${step.description}-${index}`}
          >
            <span className="flex size-[35px] items-center justify-center rounded-full border border-[#e9e2d6] bg-[#f9f4f0] text-black">
              {stepIcons[index] ?? stepIcons[2]}
            </span>
            <div className="flex min-h-[59px] min-w-0 flex-col justify-center gap-4 border-l border-[#e9e2d6] pb-6 pl-4">
              <p className="font-open-sans text-sm leading-[1.6] text-black">
                {step.description}
              </p>
              {step.links.length > 0 && (
                <div className="flex flex-col gap-2">
                  {step.links_title && (
                    <p className="font-open-sans text-[13px] font-semibold leading-none text-[#9a9a9a]">
                      {step.links_title}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
                    {step.links.map((link) => (
                      <EelisaActionLink
                        href={link.url}
                        key={link.url}
                        label={link.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </EelisaSection>
  );
}
