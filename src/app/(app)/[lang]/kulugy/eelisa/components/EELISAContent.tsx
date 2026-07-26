import type { EelisaPage } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { EelisaApplicationSteps } from "./EelisaApplicationSteps";
import { EelisaPartners } from "./EelisaPartners";
import { EelisaSection } from "./EelisaSection";
import type { EelisaStaticContent } from "./eelisa.types";

interface EelisaContentProps {
  cmsContent: EelisaPage;
  isEnglish: boolean;
  staticContent: EelisaStaticContent;
}

export default function EELISAContent({
  cmsContent,
  isEnglish,
  staticContent,
}: Readonly<EelisaContentProps>) {
  const description = isEnglish
    ? cmsContent.description_en || cmsContent.description_hu
    : cmsContent.description_hu || cmsContent.description_en;
  const partners = cmsContent.partnerUniversities ?? [];

  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      <EelisaSection title={staticContent.what_is_it.title}>
        <div className="richtext max-w-none font-open-sans text-sm leading-[1.6] text-black">
          <RichText data={description} />
        </div>
      </EelisaSection>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
        <EelisaApplicationSteps
          steps={staticContent.how_to_apply.steps}
          title={staticContent.how_to_apply.title}
        />
        <EelisaPartners
          partners={partners}
          title={staticContent.partners.title}
        />
      </div>
    </div>
  );
}
