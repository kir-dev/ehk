import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { ReactNode } from "react";

interface AcademicScholarshipContent {
  title: string;
  intro: string;
  who: {
    title: string;
    items: string[];
  };
  calculation: {
    title: string;
    paragraphs: string[];
  };
  decision: {
    title: string;
    paragraphs: string[];
  };
  tjsz: {
    title: string;
    quotes: string[];
  };
}

export default function StudyScholarshipContent({ content }: { content: AcademicScholarshipContent }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      {/* Intro Card */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <Paragraph>
                {content.intro}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Who can receive */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                {content.who.title}
              </h3>
              <div className="prose max-w-none text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  {content.who.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How calculated */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                {content.calculation.title}
              </h3>
              <div className="space-y-2">
                {content.calculation.paragraphs.map((para, i) => (
                  <Paragraph key={i}>{para}</Paragraph>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Who decides */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                 {content.decision.title}
              </h3>
              {content.decision.paragraphs.map((para, i) => (
                  <Paragraph key={i}>{para}</Paragraph>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TJSZ Passages */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                 {content.tjsz.title}
              </h3>
              
              <div className="grid gap-4 mt-2">
                {content.tjsz.quotes.map((quote, i) => (
                  <RuleQuote key={i}>{quote}</RuleQuote>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Paragraph({children} : {children:ReactNode}){
  return(
    <div className="prose max-w-none text-gray-700 richtext">
      <p>{children}</p>
    </div>
  );
}

function RuleQuote({children} : {children:ReactNode}) {
  return (
    <blockquote className="border-l-4 border-[#862633]/30 bg-gray-50 p-4 rounded-r-lg text-gray-700 italic text-sm md:text-base relative overflow-hidden">
      <Quote className="absolute top-2 right-2 w-8 h-8 text-[#862633]/5 rotate-180" />
      {children}
    </blockquote>
  )
}