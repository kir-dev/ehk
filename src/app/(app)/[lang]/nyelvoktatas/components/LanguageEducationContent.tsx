import { PageHeader } from "@/components/common/PageHeader";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface LanguageEducationContentProps {
  content: {
    title: string;
    subtitle: string;
    image_alt: string;
    paragraphs: string[];
    link: {
      label: string;
      url: string;
    };
  };
}

export default function LanguageEducationContent({
  content,
}: LanguageEducationContentProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
      {/* Left column: page header + large image */}
      <div className="flex flex-col lg:basis-[70%] lg:shrink-0">
        <PageHeader title={content.title} subtitle={content.subtitle} />
        <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-3 md:p-8">
          <Image
            src="/nyelviskola.png"
            alt={content.image_alt}
            width={2197}
            height={3071}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Right column: info card with text and external link */}
      <div className="lg:flex-1">
        <div className="bg-[#fffefc] border border-[#e9e2d6] rounded-2xl p-4 md:p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 font-open-sans text-base leading-relaxed text-[#1a1a1a]">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <a
            href={content.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start bg-white border border-[#e9e2d6] hover:border-[#862633] text-[#1a1a1a] hover:text-[#862633] px-4 py-2 rounded-2xl font-open-sans text-sm transition-colors duration-200"
          >
            <span>{content.link.label}</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
