import Link from "next/link";

import type { Locale } from "@/i18n-config";

import type { AdmissionInformation } from "../admissionInformation.types";

interface DormitoryAdmissionInformationContentProps {
  content: AdmissionInformation;
  locale: Locale;
}

const inlineLinkClassName =
  "font-semibold text-black underline decoration-1 underline-offset-2 transition-colors hover:text-ehk-dark-red";

export default function DormitoryAdmissionInformationContent({
  content,
  locale,
}: Readonly<DormitoryAdmissionInformationContentProps>) {
  return (
    <div className="rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8 xl:min-h-[606px]">
      <section className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] p-4">
        <h2 className="font-playfair text-base font-semibold leading-[1.4] text-black">
          {content.application}
        </h2>

        <div className="h-px w-full bg-[#e9e2d6]" />

        <div className="flex flex-col gap-2 font-open-sans text-sm leading-[1.6] text-black">
          <p>{content.capacity_p2}</p>

          <p>
            {content.introduction_p1}
            <Link
              className={inlineLinkClassName}
              href={`/${locale}/kollegium/kollegium-bemutato`}
            >
              {content.introduction_link}
            </Link>
            {content.introduction_p2}
          </p>

          <p>
            {content.application_p2}
            <a
              className={inlineLinkClassName}
              href="https://kefir.bme.hu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              KEFIR
            </a>
            {content.application_p3}
          </p>

          <p>{content.application_p1}</p>
        </div>
      </section>
    </div>
  );
}
