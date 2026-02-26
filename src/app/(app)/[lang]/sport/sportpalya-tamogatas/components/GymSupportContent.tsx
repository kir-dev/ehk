import React, {ReactNode} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { parseFormattedText } from '@/utils/parseFormattedText'; 

interface SportpalyaTamogatasContentData {
  title: string;
  description: string;
  application: { 
    title: string; 
    description: string 
  };
  period: { 
    title: string; 
    items: string[] 
  };
  condition: { 
    title: string; 
    intro: string; 
    items: string[]; 
    outro: string 
  };
  selection: { 
    title: string; 
    description: string; 
    items: string[] 
  };
  result: { 
    title: string;
    items: string[] 
  };
  
  footer: string;
}

export default function SportpalyaTamogatasContent({ content }: { content: SportpalyaTamogatasContentData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      {/* Introduction */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <Paragraph>
            {parseFormattedText(content.description)}
            </Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Application */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.application.title}
            </h3>
            <Paragraph>{parseFormattedText(content.application.description)}</Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Support Period and Location */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.period.title}
            </h3>
            <div className="space-y-2 text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                {content.period.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.condition.title}
            </h3>
            <p>{parseFormattedText(content.condition.intro)}</p>
            <ol className="list-decimal pl-5 space-y-1">
              {content.condition.items.map((item, i) => (
              <li key={i}>{parseFormattedText(item)}</li>
              ))}
            </ol>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold">
              {parseFormattedText(content.condition.outro)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.selection.title}
            </h3>
            <Paragraph>{parseFormattedText(content.selection.description)}</Paragraph>
            <ul className="list-disc pl-5 space-y-1">
              {content.selection.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.result.title}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {content.result.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-gray-400 italic mt-4">{parseFormattedText(content.footer)}</p>
    </div>
  );
};

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <div className="prose max-w-none text-gray-700 richtext">
      <p>{children}</p>
    </div>
  );
}