import {ReactNode} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';

interface SportteremContentData {
  title: string;
  description: string;
  facilities: { 
    title: string; 
    items: string[] 
  };
  conditions: { 
    title: string; 
    description: string 
  };
  process: { 
    title: string; 
    description: string; 
    warning: string 
  };
  requiredData: { 
    title: string; 
    intro: string; 
    items: string[] 
  };
  selection: { 
    title: string; 
    intro: string; 
    items: string[]; 
    warning: string 
  };
  usage: { 
    title: string;
    items: string[] 
  };
  costs: { 
    title: string; 
    description: string; 
    items: string[] 
  };
  contact: { 
    title: string; 
    description: string 
  };
  footer: string;
}

function convertEmailsToLinks(text: string) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  const parts = text.split(emailRegex);
  
  return parts.map((part, index) => {
    if (emailRegex.test(part)) {
      return (
        <a 
          key={index} 
          href={`mailto:${part}`}
          className="text-[#862633] hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function SportteremContent({ content }: { content: SportteremContentData }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      <PageHeader title={content.title} />

      {/* Introduction */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <Paragraph>
            {convertEmailsToLinks(content.description)}
            </Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.facilities.title}
            </h3>
            <div className="space-y-2 text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                {content.facilities.items.map((item, i) => (
                <li key={i}>{convertEmailsToLinks(item)}</li>
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
              {content.conditions.title}
            </h3>
            <Paragraph>{convertEmailsToLinks(content.conditions.description)}</Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Process & Deadlines */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.process.title}
            </h3>
            <Paragraph>{convertEmailsToLinks(content.process.description)}</Paragraph>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold">
              {convertEmailsToLinks(content.process.warning)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Data */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.requiredData.title}
            </h3>
            <p>{convertEmailsToLinks(content.requiredData.intro)}</p>
            <ul className="list-disc pl-5 space-y-1">
              {content.requiredData.items.map((item, i) => (
                <li key={i}>{convertEmailsToLinks(item)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Selection Criteria */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.selection.title}
            </h3>
            <p>{convertEmailsToLinks(content.selection.intro)}</p>
            <ul className="list-disc pl-5 space-y-1">
              {content.selection.items.map((item, i) => (
                <li key={i}>{convertEmailsToLinks(item)}</li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold">
              {convertEmailsToLinks(content.selection.warning)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules & usage */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.usage.title}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {content.usage.items.map((item, i) => (
                <li key={i}>{convertEmailsToLinks(item)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Costs */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.costs.title}
            </h3>
            <Paragraph>{convertEmailsToLinks(content.costs.description)}</Paragraph>
            <ul className="list-disc pl-5 space-y-1">
              {content.costs.items.map((item, i) => (
                <li key={i}>{convertEmailsToLinks(item)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Kapcsolattartás */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.contact.title}
            </h3>
            <Paragraph>{convertEmailsToLinks(content.contact.description)}</Paragraph>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-gray-400 italic mt-4">{convertEmailsToLinks(content.footer)}</p>

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