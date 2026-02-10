import {JSX, ReactNode} from 'react';
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

function parseFormattedText(text: string) {
  // Split by both patterns
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  
  // Combined regex to match both bold and email
  const combinedRegex = /(\*\*.*?\*\*)|([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  
  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Check if it's bold text
    if (match[0].startsWith('**')) {
      const boldText = match[0].replace(/\*\*/g, '');
      
      // Check if bold text contains an email
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
      const emailMatch = emailRegex.exec(boldText);
      
      if (emailMatch) {
        // Bold text with email inside
        parts.push(
          <a 
            key={match.index}
            href={`mailto:${emailMatch[0]}`}
            className="text-[#862633] hover:underline font-bold"
            >
            {boldText}
            </a>
        );
      } else {
        // Just bold text
        parts.push(<strong key={match.index} className="font-bold">{boldText}</strong>);
      }
    } else {
      // Just email link (not bold)
      parts.push(
        <a 
          key={match.index}
          href={`mailto:${match[0]}`}
          className="text-[#862633] hover:underline font-medium"
        >
          {match[0]}
        </a>
      );
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
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
            {parseFormattedText(content.description)}
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
              {content.conditions.title}
            </h3>
            <Paragraph>{parseFormattedText(content.conditions.description)}</Paragraph>
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
            <Paragraph>{parseFormattedText(content.process.description)}</Paragraph>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold">
              {parseFormattedText(content.process.warning)}
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
            <p>{parseFormattedText(content.requiredData.intro)}</p>
            <ul className="list-disc pl-5 space-y-1">
              {content.requiredData.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
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
            <p>{parseFormattedText(content.selection.intro)}</p>
            <ul className="list-disc pl-5 space-y-1">
              {content.selection.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold">
              {parseFormattedText(content.selection.warning)}
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
                <li key={i}>{parseFormattedText(item)}</li>
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
            <Paragraph>{parseFormattedText(content.costs.description)}</Paragraph>
            <ul className="list-disc pl-5 space-y-1">
              {content.costs.items.map((item, i) => (
                <li key={i}>{parseFormattedText(item)}</li>
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
            <Paragraph>{parseFormattedText(content.contact.description)}</Paragraph>
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