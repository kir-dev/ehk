import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { ReactNode } from "react";
import { STUDY_SCHOLARSHIP_TEXTS } from "./study-scholarship.constants";

export default function StudyScholarshipContent({ locale }: { locale?: 'hu' | 'en' }) {
  const lang = locale ?? 'hu';
  const isEn = lang === "en";

  // Helper to pick language
  const gt = (obj: { hu: string; en: string }) => (isEn ? obj.en || obj.hu : obj.hu);

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      {/* Intro Card */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <Paragraph>
                {gt(STUDY_SCHOLARSHIP_TEXTS.intro)}
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
                {gt(STUDY_SCHOLARSHIP_TEXTS.who.title)}
              </h3>
              <div className="prose max-w-none text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  {STUDY_SCHOLARSHIP_TEXTS.who.items.map((item, i) => (
                    <li key={i}>{gt(item)}</li>
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
                {gt(STUDY_SCHOLARSHIP_TEXTS.calculation.title)}
              </h3>
              <div className="space-y-2">
                {STUDY_SCHOLARSHIP_TEXTS.calculation.paragraphs.map((para, i) => (
                  <Paragraph key={i}>{gt(para)}</Paragraph>
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
                 {gt(STUDY_SCHOLARSHIP_TEXTS.decision.title)}
              </h3>
              {STUDY_SCHOLARSHIP_TEXTS.decision.paragraphs.map((para, i) => (
                  <Paragraph key={i}>{gt(para)}</Paragraph>
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
                 {gt(STUDY_SCHOLARSHIP_TEXTS.tjsz.title)}
              </h3>
              
              <div className="grid gap-4 mt-2">
                {STUDY_SCHOLARSHIP_TEXTS.tjsz.quotes.map((quote, i) => (
                  <RuleQuote key={i}>{gt(quote)}</RuleQuote>
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