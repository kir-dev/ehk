import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Send, HeartHandshake, PlaneTakeoff, Info } from "lucide-react";
import Link from "next/link";
import React from "react";

interface StepLink {
  label: string;
  url: string;
}

interface Step {
  description: string;
  links: StepLink[];
}

interface EELISAData {
  title: string;
  what_is_it: {
    title: string;
    description: string;
  };
  partners: {
    title: string;
    items: string[];
  };
  how_to_apply: {
    title: string;
    steps: Step[];
  };
  current_opportunities: {
    title: string;
    link: string;
  }
  call_for_applications: {
    title: string;
    link: string;
  }
  contact: string;
}

export default function EELISAContent({ content }: Readonly<{ content: EELISAData }>) {
  // Mapping icons to steps for visual appeal
  const iconWrapper = "flex items-center justify-center w-10 h-10 bg-[#862633]/10 rounded-full shrink-0";
  const iconClass = "w-5 h-5 text-[#862633]/80 overflow-visible";

  const stepIcons = [
    <div key="0" className={iconWrapper}><SearchIcon className={iconClass} /></div>,
    <div key="1" className={iconWrapper}><CheckCircle2 className={iconClass} /></div>,
    <div key="2" className={iconWrapper}><Send className={iconClass + " -ml-0.5"} /></div>, // slight tweak to visually center the arrow
    <div key="3" className={iconWrapper}><PlaneTakeoff className={iconClass} /></div>
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:px-4 px-2 py-8">
      {/* What is EELISA? */}
      <Card className="group transition-all">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-2xl leading-tight group-hover:text-[#862633] text-gray-900 flex items-center gap-3">
              {content.what_is_it.title}
            </h3>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed">
                {content.what_is_it.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Partners */}
        <Card className="group transition-all duration-300">
          <CardContent className="p-6 md:p-8 h-full">
            <div className="flex flex-col gap-4 h-full">
              <h3 className="font-bold text-2xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors flex items-center gap-3">
                {content.partners.title}
              </h3>
              <div className="prose max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100 flex-grow">
                <ul className="list-disc pl-5 space-y-3 marker:text-[#862633]">
                  {content.partners.items.map((item, i) => (
                    <li key={i} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Apply Timeline */}
        <Card className="group transition-all duration-300">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-2xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                {content.how_to_apply.title}
              </h3>
              
              <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-8 pb-4">
                {content.how_to_apply.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[3.2rem] md:-left-[3.45rem] mt-0.5 ml-1 bg-white">
                      {stepIcons[idx % stepIcons.length]}
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-1">
                      <p className="text-gray-800 font-medium text-lg leading-relaxed">
                        {step.description}
                      </p>
                      
                      {step.links && step.links.length > 0 && (
                        <div className="flex flex-col gap-2 mt-1">
                          {step.links.map((link, j) => (
                            <Link 
                              key={j} 
                              href={link.url}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-[#862633] hover:text-red-900 font-medium transition-colors p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 hover:border-red-200 w-fit"
                            >
                              <ArrowRight className="w-4 h-4" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Button asChild variant="outline" className="h-auto p-6 font-bold text-lg text-gray-900 border-2 border-transparent hover:border-[#862633] hover:text-[#862633] rounded-xl transition-all duration-300 flex items-center justify-between">
          <Link href={content.current_opportunities.link} target="_blank">
            {content.current_opportunities.title} 
            <ArrowRight className="w-6 h-6 text-[#862633] group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto p-6 font-bold text-lg text-gray-900 border-2 border-transparent hover:border-[#862633] hover:text-[#862633] rounded-xl transition-all duration-300 flex items-center justify-between">
          <Link href={content.call_for_applications.link} target="_blank">
            {content.call_for_applications.title} 
            <ArrowRight className="w-6 h-6 text-[#862633] group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </Button>
      </div>

      {/* Contact Note */}
      <div className="mt-4 p-6 bg-[#862633]/5 rounded-xl border border-[#862633]/10 text-center">
        <p className="text-gray-700 font-medium text-lg max-w-2xl mx-auto">
          {content.contact}
        </p>
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
